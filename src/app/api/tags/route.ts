import { createNewTag } from '@/usecase/tags'
import { createTagSchema } from '@/models'
import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { tag } from '@/lib/routes'
import { message } from '@/lib/message'
import { revalidateTag } from 'next/cache'

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session || !session.user) {
    return NextResponse.json({ error: message.unauthorized }, { status: 401 })
  }
  const body = await req.json()

  try {
    const tagPayload = createTagSchema.parse(body)
    await createNewTag({ ...tagPayload, userId: session.user.id })
  } catch (e) {
    if (e instanceof Error)
      return NextResponse.json({ error: e.message }, { status: 400 })
    console.error('failed to create tag', e)
    return NextResponse.json({ error: message.unknown }, { status: 500 })
  }

  revalidateTag(tag.tag)
  return NextResponse.json({}, { status: 201 })
}
