"use client";

import { useRouter } from "next/navigation";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
import { v1 as uuid } from "uuid";

export function TypewriterEffect() {
    const router = useRouter()

    const handleCreate = () => {
        const id = uuid()
        router.push(`room?id=${id}`)
    }

    const words = [
        {
        text: "Share",
        },
        {
        text: "your",
        },
        {
        text: "files",
        },
        {
        text: "with",
        },
        {
        text: "atomixDrop.",
        className: "text-blue-500 dark:text-blue-500",
        },
    ];
    return (
        <div className="flex flex-col items-center justify-center h-[10rem]  ">
        <p className="text-neutral-600 dark:text-neutral-200 text-3xl sm:text-2xl  ">
            Files fly, directly
        </p>
        <TypewriterEffectSmooth words={words} />
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
            <button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm" onClick={handleCreate}>
            Create Room
            </button>
        </div>
        </div>
    );
}
