import { unstable_cache as cache } from 'next/cache'

import type { UpdateUserProps } from '@/models/user'
import type { User } from '@prisma/client'

import { prisma } from '@/lib/client'
import { tag } from '@/lib/routes'

export async function getUserByIdWithoutCache(
  userId: string,
): Promise<User | null> {
  console.info(`called get user by id: ${userId}`)
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })
}

export const getUserById = cache(getUserByIdWithoutCache, ['getUserById'], {
  tags: [tag.profile],
})

export async function updateUser(props: UpdateUserProps): Promise<User> {
  const { id, ...rest } = props
  return await prisma.user.update({
    where: {
      id: id,
    },
    data: rest,
  })
}
