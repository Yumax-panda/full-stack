import type { Skill, Tag } from '@prisma/client'
import { prisma } from '@/lib/client'

import type { SkillWithTags, UpdateSkillProps } from '@/models'

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

export async function updateSkill({
  id,
  tagIds,
  ...props
}: UpdateSkillProps): Promise<Skill> {
  await prisma.skillTagRelation.deleteMany({
    where: {
      skillId: id,
    },
  })
  const relations = tagIds.map((tagId) => {
    return {
      skillId: id,
      tagId,
    }
  })
  await prisma.skillTagRelation.createMany({
    data: relations,
  })
  return prisma.skill.update({
    where: {
      id,
    },
    data: props,
  })
}
