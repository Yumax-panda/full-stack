import 'server-only'

import {
  createTag,
  getTagsByUserId,
  updateTag as defaultUpdateTag,
} from '@/repository/tag'
import type { CreateTag, UpdateTag } from '@/models'

async function isDuplicateTag(userId: string, name: string) {
  const tags = await getTagsByUserId(userId)
  return tags.some((tag) => tag.name === name)
}

async function willBeDuplicateTag(userId: string, tagId: string, name: string) {
  const tags = await getTagsByUserId(userId)
  if (!tags.some((tag) => tag.id === tagId)) {
    throw new Error('タグが存在しません')
  }
  return tags.some((tag) => tag.name === name && tag.id !== tagId)
}

export async function createNewTag(data: CreateTag & { userId: string }) {
  const { userId, name } = data
  if (await isDuplicateTag(userId, name)) {
    throw new Error('タグ名が重複しています')
  }
  return createTag(data)
}

export async function updateTag({
  id,
  userId,
  ...data
}: UpdateTag & { userId: string }) {
  if (await willBeDuplicateTag(userId, id, data.name)) {
    throw new Error('タグ名が重複しています')
  }
  return defaultUpdateTag({ id, userId, ...data })
}
