import { createFactory } from 'hono/factory'

import type { User } from '@prisma/client'

type Env = {
  Variables: {
    user: User
  }
}

export const factory = createFactory<Env>()
