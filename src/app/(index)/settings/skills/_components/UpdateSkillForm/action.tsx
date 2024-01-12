'use server'

import { revalidatePath } from 'next/cache'

import { getImage } from '@/constants/skills'
import { routes } from '@/lib/routes'
import { updateSkillSchema } from '@/models'
import { updateSkill } from '@/repository/skill'

// TODO: エラー処理 名前の重複など
export async function updateSkillAction(skillId: string, formData: FormData) {
  const data: any = {
    id: skillId,
    name: formData.get('name'),
    tagIds: formData.getAll('tagIds'),
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
  await updateSkill(parsed.data)
  console.log('updateSkillAction', parsed.data)
  revalidatePath(routes.userSkillEdit(), 'page')
}
