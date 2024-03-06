import { PrismaClient } from '@prisma/client'

import {
  initialize,
  defineUserFactory,
  defineAccountFactory,
  defineSessionFactory,
  defineSkillFactory,
  defineTagFactory,
  defineSkillTagRelationFactory,
  defineWorkFactory,
  defineArticleTokenFactory,
  defineVerificationTokenFactory,
} from '@/__generated__/fabbrica'

const prisma = new PrismaClient()
initialize({ prisma })

export function createFactory() {
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
  const SkillFactory = defineSkillFactory({
    defaultData: {
      user: UserFactory,
    },
  })
  const TagFactory = defineTagFactory({
    defaultData: {
      user: UserFactory,
    },
  })
  const SkillTagRelationFactory = defineSkillTagRelationFactory({
    defaultData: {
      skill: SkillFactory,
      tag: TagFactory,
    },
  })
  const SessionFactory = defineSessionFactory({
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

  return {
    UserFactory,
    AccountFactory,
    WorkFactory,
    SkillFactory,
    TagFactory,
    SkillTagRelationFactory,
    SessionFactory,
    ArticleTokenFactory,
    VerificationTokenFactory,
  }
}
