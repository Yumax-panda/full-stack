import { zValidator } from '@hono/zod-validator'

import { parse } from 'node-html-parser'
import z from 'zod'

import { factory } from './utils'

import { UNKNOWN_ERROR } from '@/lib/error'

const OGImageSchema = z.object({
  url: z.string(),
})

export const embed = factory
  .createApp()
  // POST /api/v1/embeds
  .post('/', zValidator('json', OGImageSchema), async (c) => {
    const { url } = c.req.valid('json')

    try {
      const res = await fetch(url, {
        headers: {
          'Allow-Cross-Origin-Origin': '*',
        },
        next: { revalidate: 259200 }, // 1month
      })
      const text = await res.text()
      const doc = parse(text)
      const title = doc.querySelector('meta[property="og:title"]')
      const image = doc.querySelector('meta[property="og:image"]')
      const favicon = doc.querySelector('link[rel="icon"]')
      const siteName = doc.querySelector('meta[property="og:site_name"]')

      return c.json(
        {
          title: title?.getAttribute('content') || '',
          image: image?.getAttribute('content') || '',
          favicon: favicon?.getAttribute('href') || '',
          siteName: siteName?.getAttribute('content') || '',
          url,
        },
        { status: 200 },
      )
    } catch (e) {
      return c.json({ error: UNKNOWN_ERROR }, { status: 500 })
    }
  })
