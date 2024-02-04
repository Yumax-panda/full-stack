import type { Skill, Tag } from '@prisma/client'
import { unstable_cache as cache } from 'next/cache'

import { prisma } from '@/lib/client'
import { tag } from '@/lib/routes'
import { getTagsByUserId } from './tag'

import type { SkillWithTags, CreateSkillProps } from '@/models'

async function getSkillsByUserIdWithoutCache(userId: string) {
  console.info(`called get skills by user id: ${userId}`)
  return await prisma.skill.findMany({
    where: {
      userId,
    },
    include: {
      tags: true,
    },
  })
}

export const getSkillsByUserId = cache(
  getSkillsByUserIdWithoutCache,
  ['getSkillsByUserId'],
  { tags: [tag.skill] },
)

export async function getSkillsWithTagsByUserIdWithoutCache(
  userId: string,
): Promise<SkillWithTags[]> {
  console.info(`called get skills with tags by user id: ${userId}`)
  const [skills, tags] = await Promise.all([
    getSkillsByUserIdWithoutCache(userId),
    getTagsByUserId(userId),
  ])
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
  getSkillsWithTagsByUserIdWithoutCache,
  ['getSkillsWithTagsByUserId'],
  { tags: [tag.skill, tag.tag] },
)

// ref: https://www.prisma.io/docs/orm/prisma-schema/data-model/relations/many-to-many-relations#explicit-many-to-many-relations
export async function createSkill({
  tags,
  ...data
}: CreateSkillProps & { userId: string }): Promise<Skill> {
  return await prisma.skill.create({
    data: {
      ...data,
      tags: {
        create: tags.map((id) => ({
          createdAt: new Date(),
          tag: {
            connect: {
              id: id,
              userId: data.userId,
            },
          },
        })),
      },
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
