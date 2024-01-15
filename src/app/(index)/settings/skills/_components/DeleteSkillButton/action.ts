'use server'

import { revalidateTag } from 'next/cache'

import { tag } from '@/lib/routes'
import { deleteSkill } from '@/repository/skill'

export async function deleteSkillAction(skillId: string, _: FormData) {
  await deleteSkill({ id: skillId })
  revalidateTag(tag.skill)
}
