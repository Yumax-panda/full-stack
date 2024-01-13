'use server'

import { revalidatePath } from 'next/cache'

import { routes } from '@/lib/routes'
import { updateUserSchema } from '@/models/user'
import { updateUser } from '@/repository/user'

export async function updateUserAction(userId: string, formData: FormData) {
  const data: any = {
    id: userId,
    location: formData.get('location') || null,
    organization: formData.get('organization') || null,
  }

  const parsed = updateUserSchema.safeParse(data)

  if (!parsed.success) {
    throw new Error(parsed.error.message)
  }

  await updateUser(parsed.data)
  revalidatePath(routes.userProfileSettings(), 'page')
  revalidatePath(routes.userSkill(userId), 'layout')
}
