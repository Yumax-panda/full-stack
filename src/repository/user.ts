import { prisma } from '@/lib/client'

import type { User } from '@/models'

export async function getUserById(userId: string): Promise<User | null> {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })
}
