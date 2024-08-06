import { tag } from '@/lib/routes'
import { updateArticleToken as updateArticleTokenSchema } from '@/models/articleToken'
import { updateUserSchema } from '@/models/user'
import { updateArticleToken } from '@/repository/articleToken'
import { updateUser } from '@/repository/user'
import { zValidator } from '@hono/zod-validator'
import { revalidateTag } from 'next/cache'
import { factory } from './utils'

const me = factory
  .createApp()
  // PATCH /users/@me
  .patch('/', zValidator('json', updateUserSchema), async (c) => {
    const userId = c.var.user.id
    const user = c.req.valid('json')

    try {
      await updateUser({ id: userId, ...user })
      revalidateTag(tag.profile)
      return new Response(null, { status: 204 })
    } catch (e) {
      console.error('failed to update user', e)
      return new Response(null, { status: 400 })
    }
  })
  // PATCH /users/@me/tokens
  .patch('/tokens', zValidator('json', updateArticleTokenSchema), async (c) => {
    const userId = c.var.user.id
    const tokens = c.req.valid('json')

    for (const [name, token] of Object.entries(tokens)) {
      if (name === 'QIITA' || name === 'ZENN' || name === 'NOTE') {
        try {
          await updateArticleToken({
            userId,
            provider: name,
            token: !!token ? token : null,
          })
        } catch (e) {
          console.error('failed to update article token', e)
          return new Response(null, { status: 400 })
        }
      }
    }

    revalidateTag(tag.token)
    return new Response(null, { status: 204 })
  })

export const user = factory.createApp().route('/@me', me)
