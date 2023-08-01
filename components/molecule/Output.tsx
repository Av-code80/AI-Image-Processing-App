/* eslint-disable @next/next/no-img-element */
import { twMerge } from 'tailwind-merge'
import { useEffect, useRef } from 'react'
import useFileUrl from '@/components/atom/useFileUrl'
import downloadImage from '@/components/atom/downloadImage'
import Button from '@/components/atom/Button'

type Props = {
  original: File
  result: File | null
  canvasMode?: boolean // New prop for background color
}

export default function Output({
  original,
  result,
  canvasMode = false,
}: Props) {
  const canvasRef= useCanvas(result, canvasMode)
  const src = useFileUrl(result ?? original)

  return (
    <div className="relative h-full w-full">
      {canvasMode && result ? (
        <canvas ref={canvasRef} className="w-full h-full" />
      ) : (
        <img
          src={src}
          alt="result"
          className={twMerge(
            'w-full h-full object-contain',
            result ? '' : 'animate-pulse',
          )}
        />
      )}

      {result && typeof src === 'string' && (
        <Button
          className="absolute top-1 right-1" 
          onClick={() => downloadImage(src, result.name)}
        >
          Download
        </Button>
      )}
    </div>
  )
}

const useCanvas = (imageFile:File|null, canvasMode:boolean) => {

  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current && imageFile) {
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')

      if (context) {
        const image = new Image()
        image.src = URL.createObjectURL(imageFile)
        image.onload = () => {
          canvas.width = image.width
          canvas.height = image.height
          context.drawImage(image, 0, 0, image.width, image.height)
        }
      }
    }
  }, [imageFile, canvasMode])
return canvasRef;
}