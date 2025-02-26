"use client";
import React, { useState } from "react";
import { FileUpload } from "./ui/file-upload";

interface UploadFileProps{
    onFileUpload: (files: File[]) => void
    onClick: () => void
    gotFile: boolean
    fileName: string | null
    onDownload: () => void
}

export function UploadFile({ onFileUpload, onClick, gotFile, fileName, onDownload }: UploadFileProps) {

  return (
    <div className="w-screen h-screen p-44 mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
      <FileUpload onChange={onFileUpload} />
      <div className="flex items-center justify-center">
        <button onClick={onClick} className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">Send File</button>
      </div>
      {gotFile && (
        <>
            <p className="flex items-center justify-center text-white mr-4 font-semibold pt-2">{fileName}</p>
            <div className="flex justify-center mt-4">
            <button
            className="w-40 h-10 rounded-xl bg-white text-black border border-black text-sm"
            onClick={onDownload}
            >
            Download
            </button>
        </div>
      </>
      )}
    </div>
  );
}
