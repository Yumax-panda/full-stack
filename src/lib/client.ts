import { hc } from 'hono/client'

import type { AppType } from '@/app/api/_router/router'

export const client = hc<AppType>('/')
