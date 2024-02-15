import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

import { getSession } from '@/lib/auth'
import { message } from '@/lib/message'
import { updateSkillWithTagIds, deleteSkill } from '@/usecase/skills'
import { tag } from '@/lib/routes'
import { updateSkillSchema } from '@/models'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

export async function PATCH(
  req: NextRequest,
  { params: { skillId } }: { params: { skillId: string } },
) {
  const session = await getSession()
  if (!session || !session.user) {
    return NextResponse.json({ error: message.unauthorized }, { status: 401 })
  }
  const body = await req.json()

  try {
    const skillPayload = updateSkillSchema.parse({
      id: skillId,
      ...body,
    })
    await updateSkillWithTagIds({ ...skillPayload, userId: session.user.id })
    revalidateTag(tag.skill)
    return NextResponse.json({}, { status: 200 })
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002') {
      return NextResponse.json(
        { error: '同じスキル名は登録できません' },
        { status: 400 },
      )
    }

    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 400 })
    }
    console.error('failed to update skill', e)
    return NextResponse.json({ error: message.unknown }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params: { skillId } }: { params: { skillId: string } },
) {
  const session = await getSession()
  if (!session || !session.user) {
    return NextResponse.json({ error: message.unauthorized }, { status: 401 })
  }

  try {
    await deleteSkill(skillId)
    revalidateTag(tag.skill)
    return NextResponse.json({}, { status: 200 })
  } catch (e) {
    console.error('failed to delete skill', e)
    return NextResponse.json({ error: message.unknown }, { status: 500 })
  }
}
