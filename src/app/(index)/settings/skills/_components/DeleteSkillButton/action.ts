'use server'

import { revalidatePath } from 'next/cache'

import { path } from '@/lib/routes'
import { deleteSkill } from '@/repository/skill'

export async function deleteSkillAction(skillId: string, _: FormData) {
  const skill = await deleteSkill({ id: skillId })
  revalidatePath(path.userSkill, 'page')
  revalidatePath(path.userSkillEdit, 'page')
}
