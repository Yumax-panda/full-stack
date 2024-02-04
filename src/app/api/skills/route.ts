import { tag } from '@/lib/routes'
import { revalidateTag } from 'next/cache'
import { getSession } from '@/lib/auth'
import { createSkill } from '@/usecase/skills'
import { NextRequest, NextResponse } from 'next/server'
import { message } from '@/lib/message'
import { createSkillSchema } from '@/models'

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session || !session.user) {
    return NextResponse.json({ error: message.unauthorized }, { status: 401 })
  }
  const body = await req.json()

  try {
    const skillPayload = createSkillSchema.parse(body)
    await createSkill({ ...skillPayload, userId: session.user.id })
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 400 })
    }
    console.error('failed to create skill', e)
    return NextResponse.json({ error: message.unknown }, { status: 500 })
  }
  revalidateTag(tag.skill)
  return NextResponse.json({}, { status: 201 })
}
