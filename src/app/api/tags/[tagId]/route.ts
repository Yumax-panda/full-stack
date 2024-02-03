import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

import { getSession } from '@/lib/auth'
import { message } from '@/lib/message'
import { updateTag } from '@/usecase/tags'
import { tag } from '@/lib/routes'
import { updateTagSchema } from '@/models'

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
    const tagPayload = updateTagSchema.parse(body)
    await updateTag({ ...tagPayload, userId: session.user.id, id: tagId })
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
