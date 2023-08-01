'use client'
import { twMerge } from 'tailwind-merge'

import DropZone from '@/components/molecule/DropZone'
import P from '@/components/atom/P'
import { useCallback, useRef, useState } from 'react'

export const ALLOWED_FILES = ['image/png', 'image/jpeg', 'image/webp']

type Props = {
  onFileSelected: (file: File) => void
}

export default function Input({ onFileSelected }: Props) {
  const inputFileRef = useRef<HTMLInputElement | null>(null)
  const [dragging, setDragging] = useState(false)

  async function handleFilesSelected(files: FileList | Array<File>) {
    const newFile = Array.from(files).filter((file) =>
      ALLOWED_FILES.includes(file.type),
    )[0]

    if (newFile) onFileSelected(newFile)

    if (inputFileRef.current) inputFileRef.current.value = ''
  }

  return (
    <>
      <DropZone onDrop={handleFilesSelected} onDrag={setDragging}>
        <div
          className={twMerge(
            'flex',
            'bg-purple-100',
            'border border-purple-500 rounded-lg',
            'flex-col justify-center items-center',
            'text-center px-8 py-8 sm:py-16',
            'dark:bg-gray-800',
            'cursor-pointer',
            'hover:bg-gray-200 dark:hover:bg-gray-700',
            dragging ? 'opacity-50' : '',
          )}
          onClick={() => inputFileRef.current?.click()}
        >
          <P className="border-red-50 text-center text-purple-700 text-opacity-50 mx-4 select-none">
            Drop your image here or click to select
          </P>
          <input
            type="file"
            ref={inputFileRef}
            className={twMerge(
              'absolute top-0 bottom-0 left-0 right-0',
              'hidden',
            )}
            accept={ALLOWED_FILES.join(',')}
            onChange={(ev) => handleFilesSelected(ev.currentTarget.files ?? [])}
          />
        </div>
      </DropZone>
    </>
  )
}
