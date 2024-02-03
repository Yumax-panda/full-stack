import 'server-only'

import { createTag, getTagsByUserId } from '@/repository/tag'
import type { CreateTag } from '@/models'

async function isDuplicateTag(userId: string, name: string) {
  const tags = await getTagsByUserId(userId)
  return tags.some((tag) => tag.name === name)
}

export async function createNewTag(data: CreateTag & { userId: string }) {
  const { userId, name } = data
  if (await isDuplicateTag(userId, name)) {
    throw new Error('タグ名が重複しています')
  }
  return createTag(data)
}
