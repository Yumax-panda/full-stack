'use server'

import { revalidatePath } from 'next/cache'

import { routes } from '@/lib/routes'
import { deleteSkill } from '@/repository/skill'

export async function deleteSkillAction(skillId: string, _: FormData) {
  const skill = await deleteSkill({ id: skillId })
  revalidatePath(routes.userSkill(skill.userId), 'page')
  revalidatePath(routes.userSkillEdit(), 'page')
}
