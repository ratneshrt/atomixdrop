"use client";
import React from "react";
import { SparklesCore } from "./ui/sparkles";
import toast, { Toaster } from 'react-hot-toast'

interface WaitingProps{
  roomId: string
}

export function Waiting({ roomId }: WaitingProps ) {

  const copyRoomUrl = () => {
    const roomURL = `${window.location.origin}/room?id=${roomId}`
    navigator.clipboard
      .writeText(roomURL)
      .then(() => {
        toast.success("Room URL coped to clipboard")
      })
      .catch(() => {
        toast.error('Failed to copy Room URL.')
      })
  }

  return (
    <div className="h-[40rem] pt-64 w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
      <Toaster />
      <h1 className="md:text-6xl text-3xl lg:text-7xl font-bold text-center text-white relative z-20">
        Waiting for someone to Join!
      </h1>
      <div className="w-[40rem] h-40 relative">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />

        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
      <button
        onClick={copyRoomUrl}
        className="mt-8 w-40 h-10 rounded-xl bg-blue-500 text-white border border-blue-500 text-sm hover:bg-blue-600"
      >
        Copy Room URL
      </button>
    </div>
  );
}
