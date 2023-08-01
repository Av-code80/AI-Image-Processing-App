import NetworkError from './NetworkError'

const ENDPOINT = 'https://clipdrop-api.co/super-resolution/v1'

type Params = {
  file: File
}

/**
 * @param {Params} params
 * @param {RequestInit} fetchOptions
 * @returns Blob of upscale image (PNG/JPEG formats)
 */
export default async function upscaleApi(
  params: Params,
  fetchOptions?: RequestInit,
) {
  const { file } = params

  const body = new FormData()
  body.append('image_file', file)
  body.append('upscale', "2")


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
