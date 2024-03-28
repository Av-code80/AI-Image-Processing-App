export default function downloadImage(uri: string, name: string) {
  const link = document.createElement('a')
  link.href = uri
  link.download = name

  // this is necessary as link.click() does not work on the latest firefox
  link.dispatchEvent(
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    }),
  )
  // For Firefox it is necessary to delay revoking the ObjectURL
  // window.URL.revokeObjectURL(base64)
  setTimeout(() => {
    link.remove()
  }, 100)
}
