import { hc } from 'hono/client'

import { env } from './env.mjs'

import type { AppType } from '@/app/api/core'

export const client = hc<AppType>(env.NEXTAUTH_URL)
