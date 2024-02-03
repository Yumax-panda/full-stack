import { createNewTag } from '@/usecase/tags'
import { createTagSchema } from '@/models'
import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { tag } from '@/lib/routes'
import { revalidateTag } from 'next/cache'

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const body = await req.json()
  const parsed = createTagSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(parsed.error, { status: 400 })
  }

  const tagPayload = parsed.data
  try {
    await createNewTag({ ...tagPayload, userId: session.user.id })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to create tag' }, { status: 400 })
  }

  revalidateTag(tag.tag)
  return NextResponse.json({}, { status: 201 })
}
