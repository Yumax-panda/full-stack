import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'
import { handle } from 'hono/vercel'

import { embed } from './_router/embed'
import { skill } from './_router/skills'
import { tag } from './_router/tags'
import { work } from './_router/works'

const app = new Hono()
  .basePath('/api')
  .route('/embeds', embed)
  .route('/skills', skill)
  .route('/tags', tag)
  .route('/works', work)
  .use('*', prettyJSON(), logger())

export const handler = handle(app)
export type AppType = typeof app
