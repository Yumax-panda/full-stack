import type { User } from '@prisma/client'

export type Env = {
  Variables: {
    user: User
  }
}
