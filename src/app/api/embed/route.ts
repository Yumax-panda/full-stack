import { NextRequest, NextResponse } from 'next/server'
import { parse } from 'node-html-parser'

type OGImagePayload =
  | {
      title: string | null
      image: string | null
      favicon: string | null
      siteName: string | null
      url: string
    }
  | {
      error: string
    }

export async function GET(
  req: NextRequest,
): Promise<NextResponse<OGImagePayload>> {
  const searchParams = req.nextUrl.searchParams
  const url = searchParams.get('url')
  if (!url) {
    return NextResponse.json({ error: 'Invalid url' }, { status: 400 })
  }
  try {
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

    return NextResponse.json({
      title: title?.getAttribute('content') || null,
      image: image?.getAttribute('content') || null,
      favicon: favicon?.getAttribute('href') || null,
      siteName: siteName?.getAttribute('content') || null,
      url,
    })
  } catch (e) {
    console.error(e)
    return NextResponse.json(
      { error: 'Failed to fetch site data' },
      { status: 500 },
    )
  }
}
