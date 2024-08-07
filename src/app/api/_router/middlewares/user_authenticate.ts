import { auth } from '@/lib/auth'
import { createFactory } from 'hono/factory'
import { HTTPException } from 'hono/http-exception'
import type { UserRelatedEnv } from '../types'

const factory = createFactory<UserRelatedEnv>()

/**
 * ユーザー認証ミドルウェア
 * コンテキストにユーザー情報をセットする
 */
export const userAuthenticate = factory.createMiddleware(async (c, next) => {
  const session = await auth()
  const user = session?.user

  if (!user) {
    throw new HTTPException(401, { message: 'Unauthorized' })
  }

  c.set('user', user)
  await next()
})
