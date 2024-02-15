import { tag } from '@/lib/routes'
import { revalidateTag } from 'next/cache'
import { getSession } from '@/lib/auth'
import { createSkill } from '@/repository/skill'
import { NextRequest, NextResponse } from 'next/server'
import { message } from '@/lib/message'
import { createSkillSchema } from '@/models'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

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
    if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002') {
      return NextResponse.json(
        { error: '同じスキル名は登録できません' },
        { status: 400 },
      )
    }
    if (e instanceof Error) {
      console.error('failed to create skill', e)
      return NextResponse.json({ error: e.message }, { status: 400 })
    }
    console.error('failed to create skill', e)
    return NextResponse.json({ error: message.unknown }, { status: 500 })
  }
  revalidateTag(tag.skill)
  return NextResponse.json({}, { status: 201 })
}
