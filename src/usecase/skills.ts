import 'server-only'

import { prisma } from '@/lib/client'
import { createSkill as create } from '@/repository/skill'

import type { UpdateSkillProps, CreateSkillProps } from '@/models'

// FIXME: タグが2つ以上指定されるとエラーになる
type IsSkillNameDuplicateProps = {
  userId: string
  skillId?: string
  newName: string
}

export async function isSkillNameDuplicate({
  userId,
  skillId,
  newName,
}: IsSkillNameDuplicateProps) {
  const skills = await prisma.skill.findMany({
    where: {
      userId,
      name: newName,
    },
  })

  if (skillId) {
    return skills.some((skill) => skill.id !== skillId)
  }

  return Boolean(skills.length)
}

export async function updateSkillWithTagIds({
  id,
  userId,
  tagIds,
  ...props
}: UpdateSkillProps) {
  const isNameDuplicating = await isSkillNameDuplicate({
    userId,
    skillId: id,
    newName: props.name,
  })

  if (isNameDuplicating) {
    throw new Error('スキル名が重複しています')
  }

  await prisma.skill.update({
    where: {
      id,
    },
    data: props,
  })

  await prisma.skillTagRelation.deleteMany({
    where: {
      skillId: id,
    },
  })

  await prisma.skillTagRelation.createMany({
    data: tagIds.map((tagId) => ({
      skillId: id,
      tagId,
    })),
  })
}

export async function createSkill(props: CreateSkillProps) {
  const isNameDuplicating = await isSkillNameDuplicate({
    userId: props.userId,
    newName: props.name,
  })

  if (isNameDuplicating) {
    throw new Error('スキル名が重複しています')
  }

  return create(props)
}
