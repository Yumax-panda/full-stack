import type { User } from '@prisma/client'

export type UserRelatedEnv = {
  Variables: {
    user: User
  }
}
