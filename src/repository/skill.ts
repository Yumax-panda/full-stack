import { unstable_cache as cache } from 'next/cache'

import { getTagsByUserId } from './tag'

import type { CreateSkillProps, SkillWithTags } from '@/models'
import type { Skill, Tag } from '@prisma/client'

import { prisma } from '@/lib/prisma'
import { tag } from '@/lib/routes'

async function getSkillsByUserIdWithoutCache(userId: string) {
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
  // tagを含めているため、tagのキャッシュも更新する
  { tags: [tag.skill, tag.tag] },
)

export async function getSkillsWithTagsByUserIdWithoutCache(
  userId: string,
): Promise<SkillWithTags[]> {
  const [skills, tags] = await Promise.all([
    getSkillsByUserIdWithoutCache(userId),
    getTagsByUserId(userId),
  ])
  const tagMap: Record<string, Tag> = {}
  for (const tag of tags) {
    tagMap[tag.id] = tag
  }
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
