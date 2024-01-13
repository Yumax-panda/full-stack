import type { Skill, Tag } from '@prisma/client'
import { prisma } from '@/lib/client'

import type { SkillWithTags } from '@/models'

export async function getSkillsWithTagsByUserId(
  userId: string,
): Promise<SkillWithTags[]> {
  const skills = await prisma.skill.findMany({
    where: {
      userId,
    },
    include: {
      tags: true,
    },
  })
  const tags = await prisma.tag.findMany({
    where: {
      userId,
    },
  })
  const tagMap: Record<string, Tag> = {}
  tags.forEach((tag) => {
    tagMap[tag.id] = tag
  })
  return skills.map((skill) => {
    return {
      ...skill,
      tags: skill.tags.map((relation) => tagMap[relation.tagId]),
    }
  })
}

type CreateTagProps = {
  name: string
  userId: string
  image?: string | null
  level?: 0 | 1 | 2 | 3
}

export async function createTag({
  name,
  userId,
  image,
  level,
}: CreateTagProps): Promise<Skill> {
  return prisma.skill.create({
    data: {
      name,
      userId,
      image,
      level,
    },
  })
}

type DeleteSkillProps = {
  id: string
}

export async function deleteSkill({ id }: DeleteSkillProps): Promise<Skill> {
  return prisma.skill.delete({
    where: {
      id,
    },
  })
}
