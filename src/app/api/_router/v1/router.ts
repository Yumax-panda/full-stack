import { Hono } from 'hono'
import { userAuthenticate } from '../middlewares/user_authenticate'
import type { UserRelatedEnv } from '../types'
import { embed } from './embed'
import { ogp } from './ogp'
import { skill } from './skills'
import { tag } from './tags'
import { user } from './users'
import { work } from './works'

const api = new Hono<UserRelatedEnv>()
  .use('*', userAuthenticate)
  .route('/embeds', embed)
  .route('/skills', skill)
  .route('/tags', tag)
  .route('/users', user)
  .route('/works', work)

const apiNoAuth = new Hono().route('/ogp', ogp)

export const v1 = new Hono().route('/', api).route('/', apiNoAuth)
