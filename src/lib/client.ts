import { PrismaClient } from '@prisma/client'
import { hc } from 'hono/client'

import { env } from './env.mjs'

import type { AppType } from '@/app/api/core'

export const prisma = new PrismaClient()
export const client = hc<AppType>(env.NEXTAUTH_URL)
