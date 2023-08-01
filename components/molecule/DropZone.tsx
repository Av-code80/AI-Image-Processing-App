import * as React from 'react'
import { useEffect } from 'react'

type Props = {
  children: React.ReactNode
  onDrop: (files: FileList) => void
  onDrag?: (dragging: boolean) => void
}

export default function DropZone({ children, onDrop, onDrag }: Props) {
  useEffect(() => {
    function handleDrop(e: DragEvent) {
      e.preventDefault()
      if (e.dataTransfer) onDrop(e.dataTransfer.files)
      onDrag?.(false)
    }

    function handleDragover(e: DragEvent) {
      e.preventDefault()
      onDrag?.(true)
    }

    function handleDragleave(e: DragEvent) {
      e.preventDefault()
      onDrag?.(false)
    }

    window.addEventListener('drop', handleDrop)
    window.addEventListener('dragover', handleDragover)
    window.addEventListener('dragleave', handleDragleave)
    return () => {
      window.removeEventListener('drop', handleDrop)
      window.removeEventListener('dragover', handleDragover)
      window.removeEventListener('dragleave', handleDragleave)
    }
  }, [onDrop, onDrag])

  useEffect(() => {
    if (typeof window === 'undefined') return

    function handlePaste(e: ClipboardEvent) {
      if (e.clipboardData && e.clipboardData.files.length > 0) {
        onDrop(e.clipboardData.files)
      }
    }

    window.addEventListener('paste', handlePaste)
    return () => {
      window.removeEventListener('paste', handlePaste)
    }
  }, [onDrop])

  return <>{children}</>
}
