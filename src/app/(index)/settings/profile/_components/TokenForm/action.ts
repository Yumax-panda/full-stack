'use server'

import { revalidateTag } from 'next/cache'

import { tag } from '@/lib/routes'
import { updateArticleTokenSchema } from '@/models/articleToken'
import { updateArticleToken } from '@/repository/articleToken'

export async function updateTokenAction(userId: string, formData: FormData) {
  const tokens = ['NOTE', 'ZENN', 'QIITA'].map((provider) => {
    const token = formData.get(provider)
    return updateArticleTokenSchema.safeParse({
      userId,
      provider,
      token: token === '' ? null : token,
    })
  })

  const tasks: Promise<void>[] = []

  for (const result of tokens) {
    if (result.success) {
      tasks.push(updateArticleToken(result.data))
    }
  }

  await Promise.all(tasks)
  revalidateTag(tag.token)
}
