'use client'

import { v1 as uuid} from 'uuid'
import { useRouter } from 'next/navigation'

export function CreateRoom(){
    const router = useRouter()

    const handleCreate = () =>  {
        const id = uuid()
        router.push(`room?id=${id}`)
    }

    return (
        <button onClick={handleCreate} className='px-4 py-2 bg-blue-500 text-white rounded-md'>Create Room</button>
    )
}