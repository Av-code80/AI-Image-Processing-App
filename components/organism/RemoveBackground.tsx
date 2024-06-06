'use client'
import { useState } from 'react'

import Input from '@/components/molecule/Input'
import Output from '@/components/molecule/Output'
import useConcurrencyController from '@/components/atom/useConcurrencyController'
import removeBackgroundApi from '@/adapters/remove-bckground-api'
import Button from '../atom/Button'

/**
 * Custom hook to manage & control concurrent requests
 */

export const ALLOWED_FILES = ['image/png', 'image/jpeg', 'image/webp']
export default function RemoveBackground() {
  const [file, setFile] = useState<File | null>(null)
  const [result, setResult] = useState<File | null>(null)

  function close() {
    setFile(null)
    setResult(null)
  }

  const [getController] = useConcurrencyController()
  async function removeBackground(file: File) {
    setFile(file)
    setResult(null)

    const controller = getController()

    try {
      const result = await removeBackgroundApi(
        { file },
        { signal: controller.signal },
      )

      const resultFile = new File([result], file.name, { type: file.type })
      setResult(resultFile)
    } catch (error) {
      alert('Failed to remove background')
      setFile(null)
    }
  }

  if (file) {
    return (
      <div className="w-full h-full relative">
        <Output original={file} result={result} />
        <Button className="absolute top-1 left-1" onClick={close}>
          X
        </Button>
      </div>
    )
  }

  return <Input onFileSelected={removeBackground} />
}
