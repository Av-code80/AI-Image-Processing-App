import { useCallback, useEffect, useRef } from 'react'

export default function useConcurrencyController() {
  const abortControllerRef = useRef<AbortController | null>(null)
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  const get = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    abortControllerRef.current = new AbortController()
    return abortControllerRef.current
  }, [])

  const abort = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
  }, [])

  return [get, abort, abortControllerRef] as const
}
