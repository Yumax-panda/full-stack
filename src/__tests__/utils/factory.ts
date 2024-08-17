import { PrismaClient } from '@prisma/client'

import type {
  Account,
  ArticleToken,
  Session,
  Skill,
  SkillTagRelation,
  Tag,
  User,
  VerificationToken,
  Work,
} from '@prisma/client'

import {
  defineAccountFactory,
  defineArticleTokenFactory,
  defineSessionFactory,
  defineSkillFactory,
  defineSkillTagRelationFactory,
  defineTagFactory,
  defineUserFactory,
  defineVerificationTokenFactory,
  defineWorkFactory,
  initialize,
} from '@/__generated__/fabbrica'

const prisma = new PrismaClient()
initialize({ prisma })

const UserFactory = defineUserFactory()

const AccountFactory = defineAccountFactory({
  defaultData: {
    user: UserFactory,
  },
})

const WorkFactory = defineWorkFactory({
  defaultData: {
    user: UserFactory,
  },
})

export const SkillFactory = defineSkillFactory({
  defaultData: {
    user: UserFactory,
  },
})

export const TagFactory = defineTagFactory({
  defaultData: {
    user: UserFactory,
  },
})

export const SkillTagRelationFactory = defineSkillTagRelationFactory({
  defaultData: {
    skill: SkillFactory,
    tag: TagFactory,
  },
})

export const SessionFactory = defineSessionFactory({
  defaultData: {
    user: UserFactory,
  },
})

const ArticleTokenFactory = defineArticleTokenFactory({
  defaultData: {
    user: UserFactory,
  },
})

const VerificationTokenFactory = defineVerificationTokenFactory()

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
  }
}
