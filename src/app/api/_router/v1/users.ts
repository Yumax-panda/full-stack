import { tag } from '@/lib/routes'
import { updateArticleTokenSchema } from '@/models/articleToken'
import { updateUserSchema } from '@/models/user'
import { updateArticleToken } from '@/repository/articleToken'
import { updateUser } from '@/repository/user'
import { zValidator } from '@hono/zod-validator'
import type { ArticleToken } from '@prisma/client'
import { Hono } from 'hono'
import { revalidateTag } from 'next/cache'
import type { UserRelatedEnv } from '../types'

const me = new Hono<UserRelatedEnv>()
  // PATCH /users/@me
  .patch('/', zValidator('json', updateUserSchema), async (c) => {
    const userId = c.var.user.id
    const user = c.req.valid('json')

    try {
      await updateUser({ id: userId, ...user })
      revalidateTag(tag.profile)
    } catch (e) {
      return c.body(null, 400)
    }

    return c.body(null, 204)
  })
  // PATCH /users/@me/tokens
  .patch('/tokens', zValidator('json', updateArticleTokenSchema), async (c) => {
    const userId = c.var.user.id
    const tokens = c.req.valid('json')

    const PROVIDERS: Record<keyof typeof tokens, ArticleToken['provider']> = {
      qiita: 'QIITA',
      zenn: 'ZENN',
      note: 'NOTE',
    }

    for (const [name, token] of Object.entries(tokens)) {
      if (name === 'qiita' || name === 'zenn' || name === 'note') {
        const provider = PROVIDERS[name]

        try {
          await updateArticleToken({
            userId,
            provider,
            token,
          })
        } catch (e) {
          return c.body(null, 400)
        }
      }
    }

    revalidateTag(tag.token)
    return c.body(null, 204)
  })

export const user = new Hono<UserRelatedEnv>().route('/@me', me)
