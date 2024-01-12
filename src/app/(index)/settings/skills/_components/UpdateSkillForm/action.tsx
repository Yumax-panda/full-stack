'use server'

import { updateSkillSchema } from '@/models'
import { updateSkill } from '@/repository/skill'

export async function updateSkillAction(skillId: string, formData: FormData) {
  const data = {
    id: skillId,
    name: formData.get('name'),
    tagIds: formData.getAll('tagIds'),
    level: formData.get('level'),
    image: formData.get('image'),
  }

  try {
    const skill = updateSkillSchema.parse(data)
    await updateSkill(skill)
  } catch (error) {
    console.error(error)
    console.error('data: ', data)
  }
}
