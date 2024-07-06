import { HTTPException } from 'hono/http-exception'

import { factory } from './core'

import { auth } from '@/lib/auth'

export const authMiddleware = factory.createMiddleware(async (c, next) => {
  const session = await auth()
  if (!session?.user) throw new HTTPException(401, { message: 'Unauthorized' })
  c.set('user', session.user)
  await next()
})
