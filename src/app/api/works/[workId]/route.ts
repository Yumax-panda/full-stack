import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

import { getSession } from '@/lib/auth'
import { updateWorkInServer } from '@/models'
import { updateWork } from '@/usecase/work'

export async function PATCH(
  req: NextRequest,
  { params: { workId } }: { params: { workId: string } },
) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const parsed = updateWorkInServer.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(parsed.error, { status: 400 })
  }
  const work = parsed.data
  await updateWork(work)

  // TODO: ユーザーマイページworks`/users/[userId]/works`, workの詳細`works/[workId]`のキャッシュを更新
  revalidatePath(`/works/${workId}/edit`, 'page')
  revalidatePath(`/works/${workId}`, 'page')
  revalidatePath(`/users/${work.userId}/works`, 'page')
  return NextResponse.json(work, { status: 200 })
}
