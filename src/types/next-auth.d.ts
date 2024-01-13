import type { DefaultUser } from 'next-auth'
import type { User } from '@prisma/client'

declare module 'next-auth' {
  interface Session {
    user?: DefaultUser & { id: string }
  }
}
