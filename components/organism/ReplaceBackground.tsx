'use client'
import { useState } from 'react'

import Input from '@/components/molecule/Input'
import Output from '@/components/molecule/Output'
import useConcurrencyController from '@/components/atom/useConcurrencyController'
import Button from '../atom/Button'
import replaceBackgroundApi from '@/adapters/replace-background-api'
import { TextInput } from '../atom/TextInput'

export const ALLOWED_FILES = ['image/png', 'image/jpeg', 'image/webp']

export default function ReplaceBackground() {
  const [file, setFile] = useState<File | null>(null)
  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState<File | null>(null)

  function close() {
    setFile(null)
    setResult(null)
    setPrompt('')
  }

  const [getController] = useConcurrencyController()
  async function replaceBackground(file: File) {
    setFile(file)
    setResult(null)

    const controller = getController()

    try {
      const result = await replaceBackgroundApi(
        { file, prompt },
        { signal: controller.signal },
      )
      const resultFile = new File([result], file.name, { type: file.type })
      setResult(resultFile)
    } catch (error) {
      alert('Failed to replace background')
      setFile(null)
    }
  }

  if (file) {
    return (
      <div className="w-full h-full relative">
        <Output original={file} result={result}  canvasMode/>
        <Button className="absolute top-1 left-1" onClick={close}>
          X
        </Button>
      </div>
    )
  }

  const handlePrompt = (e: any): void => {
    setPrompt(e.target.value)
  }

  return (
    <>
      <TextInput
      value={prompt} onChange={handlePrompt}
        id="prmopt"
        label="Enter Prompt:"
        placeholder="Bottle at the beach "
      />
      <Input onFileSelected={replaceBackground} />
    </>
  )
}
