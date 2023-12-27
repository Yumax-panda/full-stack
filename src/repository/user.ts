import { prisma } from '@/lib/client';

export async function getUserById(userId: string) {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })
}
