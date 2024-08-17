import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'
import { handle } from 'hono/vercel'
import { v1 } from './v1/router'

const app = new Hono()
  .use('*', prettyJSON(), logger())
  .basePath('/api')
  .route('/v1', v1)

export const handler = handle(app)
export type AppType = typeof app
