import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'
import { handle } from 'hono/vercel'

import { skill } from './_router/skills'
import { tag } from './_router/tags'

const app = new Hono()
  .basePath('/api')
  .route('/skills', skill)
  .route('/tags', tag)
  .use('*', prettyJSON(), logger())

export const handler = handle(app)
export type AppType = typeof app
