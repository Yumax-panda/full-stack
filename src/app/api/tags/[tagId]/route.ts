import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

import { getSession } from '@/lib/auth'
import { message } from '@/lib/message'
import { updateTag, deleteTag } from '@/repository/tag'
import { tag } from '@/lib/routes'
import { updateTagSchema } from '@/models'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

export async function PATCH(
  req: NextRequest,
  { params: { tagId } }: { params: { tagId: string } },
) {
  const session = await getSession()
  if (!session || !session.user) {
    return NextResponse.json({ error: message.unauthorized }, { status: 401 })
  }

  const body = await req.json()
  const result = updateTagSchema.safeParse({
    name: body.name,
    brief: body.brief,
    color: body.color,
    id: tagId,
  })

  if (!result.success) {
    const errors = result.error.errors.map((e) => e.message)
    return NextResponse.json({ error: errors[0] }, { status: 400 })
  }

  try {
    const payload = { ...result.data, userId: session.user.id }
    await updateTag(payload)
    revalidateTag(tag.tag)
    return NextResponse.json({}, { status: 200 })
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002') {
      return NextResponse.json(
        { error: '同じタグ名は登録できません' },
        { status: 400 },
      )
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
