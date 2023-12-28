import { parse } from 'node-html-parser'

export async function fetchOgp(url: string): Promise<string | undefined> {
  const response = await fetch(url, {
    headers: {
      'Allow-Cross-Origin-Origin': '*',
    },
  })
  const text = await response.text()
  const doc = parse(text)
  const ogImage = doc.querySelector('meta[property="og:image"]')
  if (ogImage) {
    return ogImage.getAttribute('content')
  }
  return undefined
}
