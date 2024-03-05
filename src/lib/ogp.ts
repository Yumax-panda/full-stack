import { parse } from 'node-html-parser'

export async function fetchOgp(url: string): Promise<string | undefined> {
  const response = await fetch(url, {
    headers: {
      'Allow-Cross-Origin-Origin': '*',
    },
    next: { revalidate: 259200 }, // 1month
  })
  const text = await response.text()
  const doc = parse(text)
  const ogImage = doc.querySelector('meta[property="og:image"]')
  if (ogImage) {
    return ogImage.getAttribute('content')
  }
  return undefined
}

type SiteData = {
  title?: string
  image?: string
  favicon?: string
  siteName?: string
  url: string
}

export async function fetchSiteData(url: string): Promise<SiteData> {
  const response = await fetch(url, {
    headers: {
      'Allow-Cross-Origin-Origin': '*',
    },
    next: { revalidate: 259200 }, // 1month
  })
  const text = await response.text()
  const doc = parse(text)
  const title = doc.querySelector('meta[property="og:title"]')
  const image = doc.querySelector('meta[property="og:image"]')
  const favicon = doc.querySelector('link[rel="icon"]')
  const siteName = doc.querySelector('meta[property="og:site_name"]')

  return {
    image: image?.getAttribute('content'),
    favicon: favicon?.getAttribute('href'),
    siteName: siteName?.getAttribute('content'),
    title: title?.getAttribute('content'),
    url,
  }
}
