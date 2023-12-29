'use server'

import { redirect } from 'next/navigation'

import { routes } from '@/lib/routes'
import { getOrCreateEmptyWork } from '@/usecase/work'

export async function startNewWorkAction(userId: string, formData: FormData) {
  const work = await getOrCreateEmptyWork(userId)
  redirect(routes.createNewWork(work.id))
}
