import { prisma } from '@/lib/client'

import type { User } from '@prisma/client'

export async function getUserById(userId: string): Promise<User | null> {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })
}
