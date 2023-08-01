import NetworkError from './NetworkError'

const ENDPOINT = 'https://clipdrop-api.co/remove-background/v1'

type Params = {
  file: File
}

/**
 * @param {Params} params
 * @param {RequestInit} fetchOptions
 * @returns Blob of the image without the background (PNG format)
 */
export default async function removeBackgroundApi(
  params: Params,
  fetchOptions?: RequestInit,
) {
  const { file } = params

  const body = new FormData()
  body.append('image_file', file)

  const headers = {
    'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
  }

  const result = await fetch(ENDPOINT, {
    method: 'POST',
    body,
    headers,
    ...fetchOptions,
  })

  if (result.ok) return await result.blob()

  throw new NetworkError(
    `[REMOVE_BG_API] Failed to fetch image`,
    result.statusText,
    result.status,
  )
}
