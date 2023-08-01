'use client'
import { useState } from 'react'

import Input from '@/components/molecule/Input'
import Output from '@/components/molecule/Output'
import useConcurrencyController from '@/components/atom/useConcurrencyController'
import Button from '../atom/Button'
import upscaleApi from '@/adapters/upscale-api'

export const ALLOWED_FILES = ['image/png', 'image/jpeg', 'image/webp']

export const oneKilo = 1024
export const twoKilo = 2048

export const thirtyMb = 15728628.72573

// export const twentyMBInPixel = 10485752.48382
export default function Upscale() {
  const [file, setFile] = useState<File | null>(null)
  const [result, setResult] = useState<File | null>(null)

  const [getController] = useConcurrencyController()
  
  function close() {
    setFile(null)
    setResult(null)
  }
  async function upscale(file: File) {
    const imageResolution = await getImageResolution(file)

    if (imageResolution / oneKilo >= twoKilo || file.size >= thirtyMb)
      return alert('Too Big')
    setFile(file)
    setResult(null)

    const controller = getController()

    try {
      const result = await upscaleApi({ file }, { signal: controller.signal })
      const resultFile = new File([result], file.name, { type: file.type })
      setResult(resultFile)
    } catch (error) {
      alert('Failed to upscale image')
          setFile(null)
    }
  }

  if (file) 
    return (
      <div className="w-full h-full relative">
        <Output original={file} result={result} />
        <Button className="absolute top-1 left-1" onClick={close}>
          X
        </Button>
      </div>
    )
  

  return <Input onFileSelected={upscale} />
  
}

function getImageResolution(file: File) {
  return new Promise<number>((res) => {
    const image = new Image()
    image.src = URL.createObjectURL(file)
    image.onload = () => {
      res(image.width * image.height)
    }
  })
}
