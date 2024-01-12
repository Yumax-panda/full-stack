'use server'

import { revalidatePath } from 'next/cache'

import { routes } from '@/lib/routes'
import { updateSkillSchema } from '@/models'
import { updateSkill } from '@/repository/skill'

export async function updateSkillAction(skillId: string, formData: FormData) {
  const data: any = {
    id: skillId,
    name: formData.get('name'),
    tagIds: formData.getAll('tagIds'),
    image: formData.get('image') || null,
  }

  const level = formData.get('level')

  if (level) {
    data.level = Number(level)
  }

  const parsed = updateSkillSchema.safeParse(data)
  if (!parsed.success) {
    throw new Error(parsed.error.message)
  }
  await updateSkill(parsed.data)
  revalidatePath(routes.userSkillEdit(), "page")
}
