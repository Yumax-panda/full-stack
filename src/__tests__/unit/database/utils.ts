import { createFactory } from './seed'

import type {
  User,
  Account,
  Session,
  Skill,
  Tag,
  SkillTagRelation,
  Work,
  ArticleToken,
  VerificationToken,
} from '@prisma/client'

const { UserFactory } = createFactory()
import { prisma } from '@/lib/client'

type DatabaseModelType =
  | User
  | Account
  | Session
  | Skill
  | Tag
  | SkillTagRelation
  | Work
  | ArticleToken
  | VerificationToken

type ModelRelatedTest<T extends Record<string, DatabaseModelType>> = (
  test: (models: T) => Promise<void>,
) => () => Promise<void>

export const userCreatedTest: ModelRelatedTest<{ user: User }> = (test) => {
  return async () => {
    const user = await UserFactory.create()
    await test({ user })
    await prisma.user.delete({ where: { id: user.id } })
  }
}
