'use server'

import { revalidateTag } from 'next/cache'

import type { FormState } from './types'

import { tag } from '@/lib/routes'
import { updateUserSchema } from '@/models/user'
import { updateUser } from '@/repository/user'

export async function updateUserAction(
  userId: string,
  _: any,
  formData: FormData,
): Promise<FormState> {
  const name = formData.get('name') || null
  const data: any = {
    id: userId,
    name,
    location: formData.get('location') || null,
    organization: formData.get('organization') || null,
    bio: formData.get('bio') || null,
  }

  if (name === null) {
    return { message: '名前を入力してください', success: false }
  }

  const parsed = updateUserSchema.safeParse(data)

  if (!parsed.success) {
    const message = parsed.error.errors[0].message
    return { message, success: false }
  }

  await updateUser({ id: userId, ...data })
  revalidateTag(tag.profile)
  return { message: 'プロフィールを更新しました。', success: true }
}
