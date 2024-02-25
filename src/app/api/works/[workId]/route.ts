import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

import { getSession } from '@/lib/auth'
import { message } from '@/lib/message'
import { tag } from '@/lib/routes'
import { updateWorkInServer } from '@/models'
import { updateWork, deleteWork } from '@/usecase/work'

// FIXME: workIdが冗長なので削除して良い
export async function PATCH(
  req: NextRequest,
  { params: { workId } }: { params: { workId: string } },
) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: message.unauthorized }, { status: 401 })
  }

  try {
    const body = await req.json()
    const work = updateWorkInServer.parse(body)
    await updateWork(work)
    revalidateTag(tag.work)
    return NextResponse.json(work, { status: 200 })
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 400 })
    }
    console.error('failed to update work', e)
    return NextResponse.json({ error: message.unknown }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params: { workId } }: { params: { workId: string } },
) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: message.unauthorized }, { status: 401 })
  }
  try {
    await deleteWork(workId)
    revalidateTag(tag.work)
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 400 })
    }
    console.error('failed to delete work', e)
    return NextResponse.json({ error: message.unknown }, { status: 500 })
  }
}
