'use server'

import { revalidateTag } from 'next/cache'

import { tag } from '@/lib/routes'
import { updateUserSchema } from '@/models/user'
import { updateUser } from '@/repository/user'

type FormState = string | null

export async function updateUserAction(
  userId: string,
  _: FormState,
  formData: FormData,
): Promise<FormState> {
  const data: any = {
    id: userId,
    location: formData.get('location') || null,
    organization: formData.get('organization') || null,
  }

  const parsed = updateUserSchema.safeParse(data)

  if (!parsed.success) {
    return 'フォームの入力内容が不正です。'
  }

  await updateUser(parsed.data)
  revalidateTag(tag.profile)
  return 'プロフィールを更新しました。'
}
