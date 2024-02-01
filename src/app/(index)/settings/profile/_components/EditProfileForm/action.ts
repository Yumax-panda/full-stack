'use server'

import { revalidateTag } from 'next/cache'

import { tag } from '@/lib/routes'
import { updateUserSchema } from '@/models/user'
import { updateUser } from '@/repository/user'

type FormState = {
  message: string
  success: boolean
}

export async function updateUserAction(
  userId: string,
  _: any,
  formData: FormData,
): Promise<FormState> {
  const data: any = {
    id: userId,
    location: formData.get('location') || null,
    organization: formData.get('organization') || null,
  }

  const parsed = updateUserSchema.safeParse(data)

  if (!parsed.success) {
    // おそらく起こりえない
    return { message: '入力内容に誤りがあります。', success: false }
  }

  await updateUser(parsed.data)
  revalidateTag(tag.profile)
  return { message: 'プロフィールを更新しました。', success: true }
}
