import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { parse } from 'node-html-parser'
import z from 'zod'

import { authMiddleware } from '../_middlewares/auth'

import type { Env } from '../types'

import { UNKNOWN_ERROR } from '@/lib/error'

const OGImageSchema = z.object({
  url: z.string(),
})

export const embed = new Hono<Env>()
  .use('*', authMiddleware)
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
      console.error('Failed to fetch OGP data', e)
      return c.json({ error: UNKNOWN_ERROR }, { status: 500 })
    }
  })
