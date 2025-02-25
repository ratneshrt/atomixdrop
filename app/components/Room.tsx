'use client'

import { useEffect, useRef, useState } from "react"
import { io, Socket } from "socket.io-client"
import Peer from 'simple-peer'
import { useSearchParams } from "next/navigation"

interface Payload{
  signal: any,
  callerID: string
}

interface SignalPayload{
  signal: any,
  target: string
}

export function Room(){
  const [connection, setConnection] = useState(false)
  const [file, setFile] = useState<File>()
  const [gotFile, setGotFile] = useState(false)
  const fileNameRef = useRef(null)
  const workerRef = useRef<Worker>(null)
  const [fileName, setFileName] = useState<string | null>(null)

  const socketRef = useRef<Socket | null>(null)
  const peerRef = useRef<Peer.Instance | null>(null)
  const roomID = useSearchParams().get('id')

  
  useEffect(() => {
    workerRef.current = new Worker(
      new URL('../utils/worker.js', import.meta.url)
    )
    socketRef.current = io('http://localhost:8080')
    
    socketRef.current.emit('join room', roomID)
    
    socketRef.current.on('user connected', (userId: string) => {
      const socketId = socketRef.current?.id ?? ''
      peerRef.current = createPeer(userId, socketId)
    })

    socketRef.current.on('user joined', (payload: Payload) => {
      peerRef.current = addPeer(payload.signal, payload.callerID)
    })

    socketRef.current.on('receiving returned signal', (payload: SignalPayload) => {
      console.log('Peer 1 return signal added', payload.signal)
      peerRef.current?.signal(payload.signal)
      setConnection(true)
    })

  }, [roomID])

  useEffect(() => {
    if(gotFile){
      console.log('File received', gotFile)
    }
  }, [gotFile])

  const createPeer = (target: string, callerID: string) => {
    console.log('Peer 1 created')
    const peer = new Peer({
      initiator: true,
      trickle: false
    })

    peer.on('connect', () => {
      console.log('Peer connection established')
      setConnection(true)
    })

    peer.on('signal', (signal) => {
      socketRef.current?.emit('sending signal', {
        target,
        callerID,
        signal
      })
    })

    peer.on('data', handleReceivingSignal)

    peerRef.current = peer

    return peer
  }

  const addPeer = (incomingSignal: string, callerID: string) => {
    console.log('Peer 2 added', incomingSignal)
    const peer = new Peer({
      initiator: false,
      trickle: false
    })

    peer.on('connect', () => {
      console.log('Peer connection established')
      setConnection(true)
    })
    
    peer.on('signal', (signal) => {
      socketRef.current?.emit('returning signal', {
        signal,
        target: callerID
      })
    })

    peer.on('data', handleReceivingSignal)

    peerRef.current = peer

    console.log('Peer 2 signal added', incomingSignal)
    setTimeout(() => {
      peer.signal(incomingSignal)
      console.log('Peer 2 signaled', incomingSignal)
    }, 0)

    return peer
  }

  const handleReceivingSignal = (data: any) => {
    console.log('Data incoming', data)
    const worker = workerRef.current

    if(data.toString().includes('done')){
      console.log('Data received', data)
      setGotFile(true)
      const parsed = JSON.parse(data)
      setFileName(parsed.fileName)
    }else{
      worker?.postMessage(data)
    }
  }

  const download = () => {
    setGotFile(false)
    const worker = workerRef.current
    
    worker?.postMessage('download')
    worker?.addEventListener('message', (e) => {
      const { url } = e.data
      const link = document.createElement('a')
      link.href = url
      link.download = fileName || 'downloaded_file'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    }, { once: true })
  }

  const selectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files && e.target.files.length > 0){
      setFile(e.target.files[0]) 
    }
  }

  const sendFile = () => {
    if(!file || !peerRef.current){
      console.error('No file selected or peer connection not established')
      return
    }
    const CHUNK_SIZE = 16384
    const peer = peerRef.current
    const fileReader = new FileReader()
    let offset = 0

    handleReading()

    function handleReading(){

      fileReader.addEventListener('load', (e) => {
        if(e && e.target && e.target.result && e.target.result instanceof ArrayBuffer){
          const arrayBuffer = e.target.result
          const chunkBuffer = new Uint8Array(arrayBuffer)
          peer.on('connect', () => {
            console.log('Peer connection established')
            setConnection(true)
          })
          peer.write(chunkBuffer)
          
          offset += e.target.result.byteLength

          if(file?.size){
            if(offset < file?.size){
              readSliceBlob(offset)
            }else{
              console.log('Data sent', file)
              peer?.write(JSON.stringify({
                done: true,
                fileName: file.name
              }))
            }
          }
        }
      })

      function readSliceBlob(offset: number){
        const sliceBlob = file?.slice(offset, offset + CHUNK_SIZE)
        if(!sliceBlob){
          return
        }
        fileReader.readAsArrayBuffer(sliceBlob)
      }

      readSliceBlob(0)
    }
  }

  return (
    <main>
      {roomID}
      {connection && (
        <div>
          <input onChange={selectFile} type="file"></input>
          <button onClick={sendFile}>Send File</button>
        </div>
      )}
      {gotFile && (<>
        <p>{fileName}</p>
        <button onClick={download}>Download</button>
        </>
      )}
    </main>
  )
}