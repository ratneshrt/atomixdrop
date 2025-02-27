"use client";
import React, { useState } from "react";
import { FileUpload } from "./ui/file-upload";
import toast, { Toaster } from "react-hot-toast";

interface UploadFileProps{
    onFileUpload: (files: File[]) => void
    onClick: () => void
    gotFile: boolean
    fileName: string | null
    onDownload: () => void
    progress: number
    transferSpeed: number
}

export function UploadFile({ onFileUpload, onClick, gotFile, fileName, onDownload, progress, transferSpeed }: UploadFileProps) {

  if (progress === 100){
    toast.success('File transfer successfully!')
  }

  return (
    <div className="bg-black w-screen h-screen">
      <div className="w-full h-full px-6 pt-44 pb-44 mx-auto min-h-96 border border-dashed bg-black dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
        <FileUpload onChange={onFileUpload} />
        <div className="flex items-center justify-center">
          <button onClick={onClick} className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm hover:bg-slate-200">Send File</button>
        </div>
        {/* Progress Bar and Transfer Speed */}
        {progress > 0 && progress < 100 && (
          <div className="mt-4 px-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className="bg-green-600 h-2.5 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-white text-sm mt-2">
              Transferring: {progress.toFixed(2)}%
            </p>
          </div>
        )}
        {gotFile && (
          <>
              <p className="flex items-center justify-center text-white mr-4 font-semibold pt-2">{fileName}</p>
              <div className="flex justify-center mt-4">
              <button
              className="w-40 h-10 rounded-xl bg-blue-500  text-sm hover:bg-blue-600 text-white border border-black "
              onClick={onDownload}
              >
              Download
              </button>
          </div>
        </>
        )}
      </div>
      <Toaster />
    </div>
  );
}
