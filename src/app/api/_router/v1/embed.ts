import { UNKNOWN_ERROR } from '@/lib/error'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { parse } from 'node-html-parser'
import z from 'zod'
import type { UserRelatedEnv } from '../types'

const OGImageSchema = z.object({
  url: z.string(),
})

export const embed = new Hono<UserRelatedEnv>()
  // POST /api/v1/embeds
  .post(
    '/',
    zValidator('json', OGImageSchema, (result, c) => {
      if (!result.success) {
        const error = result.error.errors[0].message
        return c.text(error, { status: 400 })
      }
    }),
    async (c) => {
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

        const title =
          doc
            .querySelector('meta[property="og:title"]')
            ?.getAttribute('content') || doc.querySelector('title')?.textContent
        const image = doc
          .querySelector('meta[property="og:image"]')
          ?.getAttribute('content')
        const favicon = doc
          .querySelector('link[rel="icon"]')
          ?.getAttribute('href')
        const faviconShortcut = doc
          .querySelector('link[rel="shortcut icon"]')
          ?.getAttribute('href')
        const siteName = doc
          .querySelector('meta[property="og:site_name"]')
          ?.getAttribute('content')

        const faviconUrl = favicon || faviconShortcut
        const isRelativeURL = !!faviconUrl && faviconUrl.startsWith('/')

        return c.json(
          {
            title: title || '',
            image: image || '',
            favicon: isRelativeURL
              ? new URL(faviconUrl, url).toString()
              : faviconUrl || '',
            siteName: siteName || '',
            url,
          },
          { status: 200 },
        )
      } catch (e) {
        return c.json({ error: UNKNOWN_ERROR }, { status: 500 })
      }
    },
  )
