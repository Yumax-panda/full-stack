import { Client } from '@planetscale/database'
import { PrismaPlanetScale } from '@prisma/adapter-planetscale'
import { PrismaClient } from '@prisma/client'
import { fetch as undiciFetch } from 'undici'
import { env } from './env.mjs'

const generatePrismaClient = (): PrismaClient => {
  const client = new Client({
    url: env.DATABASE_URL,
    fetch: undiciFetch,
  })

  const adapter = new PrismaPlanetScale(client)
  return new PrismaClient({ adapter })
}

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = generatePrismaClient()
} else {
  const globalWithPrisma = global as typeof globalThis & {
    prisma: PrismaClient
  }
  if (!globalWithPrisma.prisma) {
    globalWithPrisma.prisma = generatePrismaClient()
  }
  prisma = globalWithPrisma.prisma
}

export { prisma }
