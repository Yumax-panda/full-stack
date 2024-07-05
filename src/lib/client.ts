import { hc } from 'hono/client'

import type { AppType } from '@/app/api/core'

export const client = hc<AppType>('/')
