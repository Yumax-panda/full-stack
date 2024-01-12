'use server'

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

  try {
    const skill = updateSkillSchema.parse(data)
    // await updateSkill(skill)
    console.log('skill: ', skill)
  } catch (error) {
    console.error(error)
    console.error('data: ', data)
  }
}
