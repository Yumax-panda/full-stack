'use server'

import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

import { getImage } from '@/constants/skills'
import { routes, tag } from '@/lib/routes'
import { createSkillSchema } from '@/models'
import { createSkill } from '@/usecase/skills'

export async function createSkillAction(userId: string, formData: FormData) {
  const name = formData.get('name') as string
  const data: any = {
    name,
    userId,
    tagIds: formData.getAll('tagIds'),
    image: getImage(name),
  }

  const level = formData.get('level')

  if (level) {
    data.level = Number(level)
  }

  data.tagIds = data.tagIds.filter(Boolean)
  const parsed = createSkillSchema.safeParse(data)

  if (!parsed.success) {
    throw new Error(parsed.error.message)
  }

  await createSkill(parsed.data)
  revalidateTag(tag.skill)
  redirect(routes.userSkillEdit())
}
