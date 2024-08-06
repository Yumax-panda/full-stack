import { Hono } from 'hono'
import { factory } from './utils'

import { auth } from '@/lib/auth'
import { HTTPException } from 'hono/http-exception'
import { embed } from './embed'
import { ogp } from './ogp'
import { skill } from './skills'
import { tag } from './tags'
import { user } from './users'
import { work } from './works'

/**
 * ユーザー認証ミドルウェア
 * コンテキストにユーザー情報をセットする
 */
const userAuthenticate = factory.createMiddleware(async (c, next) => {
  const session = await auth()
  const user = session?.user

  if (!user) {
    throw new HTTPException(401, { message: 'Unauthorized' })
  }

  c.set('user', user)
  await next()
})

const api = factory
  .createApp()
  .use('*', userAuthenticate)
  .route('/embeds', embed)
  .route('/skills', skill)
  .route('/tags', tag)
  .route('/users', user)
  .route('/works', work)

const apiNoAuth = new Hono().route('/ogp', ogp)

export const v1 = new Hono().route('/', api).route('/', apiNoAuth)
