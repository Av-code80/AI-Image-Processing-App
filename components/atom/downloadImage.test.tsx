import { waitFor } from '@testing-library/react'
import downloadImage from './downloadImage'

describe('downloadImage', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })
  
  it('should create a link element with the specified URI and name, and trigger a download when clicked', async () => {
    const uri = 'https://example.com/image.jpg'
    const name = 'image.jpg'
    const link = {
      href: '',
      download: '',
      dispatchEvent: jest.fn(),
      remove: jest.fn(),
    }
    const createElementSpy = jest.spyOn(document, 'createElement')
    createElementSpy.mockReturnValueOnce(link as any)
    const dispatchEventSpy = jest.spyOn(link, 'dispatchEvent')

    downloadImage(uri, name)

    expect(createElementSpy).toHaveBeenCalledWith('a')
    expect(link.href).toBe(uri)
    expect(link.download).toBe(name)
    expect(dispatchEventSpy).toHaveBeenCalledWith(expect.any(MouseEvent))
    jest.advanceTimersByTime(100)
    await waitFor(() => {
      expect(link.remove).toHaveBeenCalled()
    })
  })
})
