'use server'

import { revalidateTag } from 'next/cache'

import { getImage } from '@/constants/skills'
import { tag } from '@/lib/routes'
import { updateSkillSchema } from '@/models'
import { updateSkillWithTagIds } from '@/usecase/skills'

// TODO: エラー処理 名前の重複など
export async function updateSkillAction(
  skillId: string,
  userId: string,
  formData: FormData,
) {
  const data: any = {
    id: skillId,
    name: formData.get('name'),
    tagIds: formData.getAll('tagIds'),
    userId,
    image: getImage(formData.get('name') as string),
  }

  const level = formData.get('level')

  if (level) {
    data.level = Number(level)
  }

  const parsed = updateSkillSchema.safeParse(data)
  if (!parsed.success) {
    throw new Error(parsed.error.message)
  }
  // フォームが空のときtagIdsが[""]になってしまうので空配列にする
  parsed.data.tagIds = parsed.data.tagIds.filter(Boolean)
  await updateSkillWithTagIds(parsed.data)
  revalidateTag(tag.skill)
}
