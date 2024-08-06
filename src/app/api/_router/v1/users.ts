import { tag } from '@/lib/routes'
import { updateUserSchema } from '@/models/user'
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

export const user = factory.createApp().route('/@me', me)
