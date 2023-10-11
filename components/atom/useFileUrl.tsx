import { useEffect, useState } from 'react'
export default function useFileUrl(file: File | null) {
  const [src, setSrc] = useState<string>()

  useEffect(() => {
    if (!file) return

    const url = URL.createObjectURL(file)
    setSrc(url)

    return () => {
      URL.revokeObjectURL(url)
    }
  }, [file])

  return src
}
