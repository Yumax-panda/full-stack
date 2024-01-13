import 'server-only'

import { prisma } from '@/lib/client'

import type { UpdateUserProps } from '@/models/user'

import type { User } from '@prisma/client'

export async function getUserById(userId: string): Promise<User | null> {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })
}

export async function updateUser(props: UpdateUserProps): Promise<User> {
  const { id, ...rest } = props
  return await prisma.user.update({
    where: {
      id: id,
    },
    data: rest,
  })
}
