import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

import { getSession } from '@/lib/auth'
import { message } from '@/lib/message'
import { updateTag } from '@/usecase/tags'
import { tag } from '@/lib/routes'
import { updateTagSchema } from '@/models'
import { deleteTag } from '@/repository/tag'

export async function PATCH(
  req: NextRequest,
  { params: { tagId } }: { params: { tagId: string } },
) {
  const session = await getSession()
  if (!session || !session.user) {
    return NextResponse.json({ error: message.unauthorized }, { status: 401 })
  }

  try {
    const body = await req.json()
    const tagPayload = updateTagSchema.parse({
      name: body.name,
      brief: body.brief,
      color: body.color,
      id: tagId,
    })
    await updateTag({ ...tagPayload, userId: session.user.id })
    revalidateTag(tag.tag)
    return NextResponse.json({}, { status: 200 })
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 400 })
    }
    console.error('failed to update tag', e)
    return NextResponse.json({ error: message.unknown }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params: { tagId } }: { params: { tagId: string } },
) {
  const session = await getSession()
  if (!session || !session.user) {
    return NextResponse.json({ error: message.unauthorized }, { status: 401 })
  }

  try {
    await deleteTag(tagId)
    revalidateTag(tag.tag)
    return NextResponse.json({}, { status: 200 })
  } catch (e) {
    console.error('failed to delete tag', e)
    return NextResponse.json({ error: message.unknown }, { status: 500 })
  }
}
