import type { Skill, Tag } from '@prisma/client'
import { unstable_cache as cache } from 'next/cache'

import { prisma } from '@/lib/client'
import { tag } from '@/lib/routes'

import type { SkillWithTags, CreateSkillProps } from '@/models'

export async function getSkillsWithTagsByUserIdWithOutCache(
  userId: string,
): Promise<SkillWithTags[]> {
  console.info(`called get skills with tags by user id: ${userId}`)
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

export const getSkillsWithTagsByUserId = cache(
  getSkillsWithTagsByUserIdWithOutCache,
  ['getSkillsWithTagsByUserId'],
  { tags: [tag.skill, tag.tag] },
)

export async function createSkill({
  tagIds,
  ...data
}: CreateSkillProps): Promise<Skill> {
  const skill = await prisma.skill.create({
    data,
  })

  const relations = tagIds.map((tagId) => ({
    skillId: skill.id,
    tagId,
  }))

  await prisma.skillTagRelation.createMany({
    data: relations,
  })

  return skill
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
