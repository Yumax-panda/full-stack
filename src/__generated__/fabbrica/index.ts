import type { Account } from '@prisma/client'
import type { Session } from '@prisma/client'
import type { Skill } from '@prisma/client'
import type { Tag } from '@prisma/client'
import type { SkillTagRelation } from '@prisma/client'
import type { Work } from '@prisma/client'
import type { ArticleToken } from '@prisma/client'
import type { User } from '@prisma/client'
import type { VerificationToken } from '@prisma/client'
import type { Provider } from '@prisma/client'
import type { Prisma } from '@prisma/client'
import type { PrismaClient } from '@prisma/client'
import {
  type ModelWithFields,
  type Resolver,
  createInitializer,
  createScreener,
  getScalarFieldValueGenerator,
  getSequenceCounter,
  normalizeList,
  normalizeResolver,
} from '@quramy/prisma-fabbrica/lib/internal'
export {
  resetSequence,
  registerScalarFieldValueGenerator,
  resetScalarFieldValueGenerator,
} from '@quramy/prisma-fabbrica/lib/internal'

type BuildDataOptions = {
  readonly seq: number
}

const initializer = createInitializer()

const { getClient } = initializer

export const { initialize } = initializer

const factoryFor = Symbol('factoryFor')

const modelFieldDefinitions: ModelWithFields[] = [
  {
    name: 'Account',
    fields: [
      {
        name: 'user',
        type: 'User',
        relationName: 'AccountToUser',
      },
    ],
  },
  {
    name: 'Session',
    fields: [
      {
        name: 'user',
        type: 'User',
        relationName: 'SessionToUser',
      },
    ],
  },
  {
    name: 'Skill',
    fields: [
      {
        name: 'user',
        type: 'User',
        relationName: 'SkillToUser',
      },
      {
        name: 'tags',
        type: 'SkillTagRelation',
        relationName: 'SkillToSkillTagRelation',
      },
    ],
  },
  {
    name: 'Tag',
    fields: [
      {
        name: 'skills',
        type: 'SkillTagRelation',
        relationName: 'SkillTagRelationToTag',
      },
      {
        name: 'user',
        type: 'User',
        relationName: 'TagToUser',
      },
    ],
  },
  {
    name: 'SkillTagRelation',
    fields: [
      {
        name: 'skill',
        type: 'Skill',
        relationName: 'SkillToSkillTagRelation',
      },
      {
        name: 'tag',
        type: 'Tag',
        relationName: 'SkillTagRelationToTag',
      },
    ],
  },
  {
    name: 'Work',
    fields: [
      {
        name: 'user',
        type: 'User',
        relationName: 'UserToWork',
      },
    ],
  },
  {
    name: 'ArticleToken',
    fields: [
      {
        name: 'user',
        type: 'User',
        relationName: 'ArticleTokenToUser',
      },
    ],
  },
  {
    name: 'User',
    fields: [
      {
        name: 'accounts',
        type: 'Account',
        relationName: 'AccountToUser',
      },
      {
        name: 'apiTokens',
        type: 'ArticleToken',
        relationName: 'ArticleTokenToUser',
      },
      {
        name: 'sessions',
        type: 'Session',
        relationName: 'SessionToUser',
      },
      {
        name: 'skills',
        type: 'Skill',
        relationName: 'SkillToUser',
      },
      {
        name: 'tags',
        type: 'Tag',
        relationName: 'TagToUser',
      },
      {
        name: 'works',
        type: 'Work',
        relationName: 'UserToWork',
      },
    ],
  },
  {
    name: 'VerificationToken',
    fields: [],
  },
]

type AccountScalarOrEnumFields = {
  type: string
  provider: string
  providerAccountId: string
}

type AccountuserFactory = {
  [factoryFor]: 'User'
  build: () => PromiseLike<
    Prisma.UserCreateNestedOneWithoutAccountsInput['create']
  >
}

type AccountFactoryDefineInput = {
  id?: string
  type?: string
  provider?: string
  providerAccountId?: string
  refresh_token?: string | null
  access_token?: string | null
  expires_at?: number | null
  token_type?: string | null
  scope?: string | null
  id_token?: string | null
  session_state?: string | null
  user: AccountuserFactory | Prisma.UserCreateNestedOneWithoutAccountsInput
}

type AccountFactoryDefineOptions = {
  defaultData: Resolver<AccountFactoryDefineInput, BuildDataOptions>
  traits?: {
    [traitName: string | symbol]: {
      data: Resolver<Partial<AccountFactoryDefineInput>, BuildDataOptions>
    }
  }
}

function isAccountuserFactory(
  x:
    | AccountuserFactory
    | Prisma.UserCreateNestedOneWithoutAccountsInput
    | undefined,
): x is AccountuserFactory {
  return (x as any)?.[factoryFor] === 'User'
}

type AccountTraitKeys<TOptions extends AccountFactoryDefineOptions> =
  keyof TOptions['traits']

export interface AccountFactoryInterfaceWithoutTraits {
  readonly [factoryFor]: 'Account'
  build(
    inputData?: Partial<Prisma.AccountCreateInput>,
  ): PromiseLike<Prisma.AccountCreateInput>
  buildCreateInput(
    inputData?: Partial<Prisma.AccountCreateInput>,
  ): PromiseLike<Prisma.AccountCreateInput>
  buildList(
    inputData: number | readonly Partial<Prisma.AccountCreateInput>[],
  ): PromiseLike<Prisma.AccountCreateInput[]>
  pickForConnect(inputData: Account): Pick<Account, 'id'>
  create(inputData?: Partial<Prisma.AccountCreateInput>): PromiseLike<Account>
  createList(
    inputData: number | readonly Partial<Prisma.AccountCreateInput>[],
  ): PromiseLike<Account[]>
  createForConnect(
    inputData?: Partial<Prisma.AccountCreateInput>,
  ): PromiseLike<Pick<Account, 'id'>>
}

export interface AccountFactoryInterface<
  TOptions extends AccountFactoryDefineOptions = AccountFactoryDefineOptions,
> extends AccountFactoryInterfaceWithoutTraits {
  use(
    name: AccountTraitKeys<TOptions>,
    ...names: readonly AccountTraitKeys<TOptions>[]
  ): AccountFactoryInterfaceWithoutTraits
}

function autoGenerateAccountScalarsOrEnums({
  seq,
}: {
  readonly seq: number
}): AccountScalarOrEnumFields {
  return {
    type: getScalarFieldValueGenerator().String({
      modelName: 'Account',
      fieldName: 'type',
      isId: false,
      isUnique: false,
      seq,
    }),
    provider: getScalarFieldValueGenerator().String({
      modelName: 'Account',
      fieldName: 'provider',
      isId: false,
      isUnique: true,
      seq,
    }),
    providerAccountId: getScalarFieldValueGenerator().String({
      modelName: 'Account',
      fieldName: 'providerAccountId',
      isId: false,
      isUnique: true,
      seq,
    }),
  }
}

function defineAccountFactoryInternal<
  TOptions extends AccountFactoryDefineOptions,
>({
  defaultData: defaultDataResolver,
  traits: traitsDefs = {},
}: TOptions): AccountFactoryInterface<TOptions> {
  const getFactoryWithTraits = (
    traitKeys: readonly AccountTraitKeys<TOptions>[] = [],
  ) => {
    const seqKey = {}
    const getSeq = () => getSequenceCounter(seqKey)
    const screen = createScreener('Account', modelFieldDefinitions)
    const build = async (
      inputData: Partial<Prisma.AccountCreateInput> = {},
    ) => {
      const seq = getSeq()
      const requiredScalarData = autoGenerateAccountScalarsOrEnums({ seq })
      const resolveValue = normalizeResolver<
        AccountFactoryDefineInput,
        BuildDataOptions
      >(defaultDataResolver ?? {})
      const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
        const acc = await queue
        const resolveTraitValue = normalizeResolver<
          Partial<AccountFactoryDefineInput>,
          BuildDataOptions
        >(traitsDefs[traitKey]?.data ?? {})
        const traitData = await resolveTraitValue({ seq })
        return {
          ...acc,
          ...traitData,
        }
      }, resolveValue({ seq }))
      const defaultAssociations = {
        user: isAccountuserFactory(defaultData.user)
          ? {
              create: await defaultData.user.build(),
            }
          : defaultData.user,
      }
      const data: Prisma.AccountCreateInput = {
        ...requiredScalarData,
        ...defaultData,
        ...defaultAssociations,
        ...inputData,
      }
      return data
    }
    const buildList = (
      inputData: number | readonly Partial<Prisma.AccountCreateInput>[],
    ) => Promise.all(normalizeList(inputData).map((data) => build(data)))
    const pickForConnect = (inputData: Account) => ({
      id: inputData.id,
    })
    const create = async (
      inputData: Partial<Prisma.AccountCreateInput> = {},
    ) => {
      const data = await build(inputData).then(screen)
      return await getClient<PrismaClient>().account.create({ data })
    }
    const createList = (
      inputData: number | readonly Partial<Prisma.AccountCreateInput>[],
    ) => Promise.all(normalizeList(inputData).map((data) => create(data)))
    const createForConnect = (
      inputData: Partial<Prisma.AccountCreateInput> = {},
    ) => create(inputData).then(pickForConnect)
    return {
      [factoryFor]: 'Account' as const,
      build,
      buildList,
      buildCreateInput: build,
      pickForConnect,
      create,
      createList,
      createForConnect,
    }
  }
  const factory = getFactoryWithTraits()
  const useTraits = (
    name: AccountTraitKeys<TOptions>,
    ...names: readonly AccountTraitKeys<TOptions>[]
  ) => {
    return getFactoryWithTraits([name, ...names])
  }
  return {
    ...factory,
    use: useTraits,
  }
}

/**
 * Define factory for {@link Account} model.
 *
 * @param options
 * @returns factory {@link AccountFactoryInterface}
 */
export function defineAccountFactory<
  TOptions extends AccountFactoryDefineOptions,
>(options: TOptions): AccountFactoryInterface<TOptions> {
  return defineAccountFactoryInternal(options)
}

type SessionScalarOrEnumFields = {
  sessionToken: string
  expires: Date
}

type SessionuserFactory = {
  [factoryFor]: 'User'
  build: () => PromiseLike<
    Prisma.UserCreateNestedOneWithoutSessionsInput['create']
  >
}

type SessionFactoryDefineInput = {
  id?: string
  sessionToken?: string
  expires?: Date
  user: SessionuserFactory | Prisma.UserCreateNestedOneWithoutSessionsInput
}

type SessionFactoryDefineOptions = {
  defaultData: Resolver<SessionFactoryDefineInput, BuildDataOptions>
  traits?: {
    [traitName: string | symbol]: {
      data: Resolver<Partial<SessionFactoryDefineInput>, BuildDataOptions>
    }
  }
}

function isSessionuserFactory(
  x:
    | SessionuserFactory
    | Prisma.UserCreateNestedOneWithoutSessionsInput
    | undefined,
): x is SessionuserFactory {
  return (x as any)?.[factoryFor] === 'User'
}

type SessionTraitKeys<TOptions extends SessionFactoryDefineOptions> =
  keyof TOptions['traits']

export interface SessionFactoryInterfaceWithoutTraits {
  readonly [factoryFor]: 'Session'
  build(
    inputData?: Partial<Prisma.SessionCreateInput>,
  ): PromiseLike<Prisma.SessionCreateInput>
  buildCreateInput(
    inputData?: Partial<Prisma.SessionCreateInput>,
  ): PromiseLike<Prisma.SessionCreateInput>
  buildList(
    inputData: number | readonly Partial<Prisma.SessionCreateInput>[],
  ): PromiseLike<Prisma.SessionCreateInput[]>
  pickForConnect(inputData: Session): Pick<Session, 'id'>
  create(inputData?: Partial<Prisma.SessionCreateInput>): PromiseLike<Session>
  createList(
    inputData: number | readonly Partial<Prisma.SessionCreateInput>[],
  ): PromiseLike<Session[]>
  createForConnect(
    inputData?: Partial<Prisma.SessionCreateInput>,
  ): PromiseLike<Pick<Session, 'id'>>
}

export interface SessionFactoryInterface<
  TOptions extends SessionFactoryDefineOptions = SessionFactoryDefineOptions,
> extends SessionFactoryInterfaceWithoutTraits {
  use(
    name: SessionTraitKeys<TOptions>,
    ...names: readonly SessionTraitKeys<TOptions>[]
  ): SessionFactoryInterfaceWithoutTraits
}

function autoGenerateSessionScalarsOrEnums({
  seq,
}: {
  readonly seq: number
}): SessionScalarOrEnumFields {
  return {
    sessionToken: getScalarFieldValueGenerator().String({
      modelName: 'Session',
      fieldName: 'sessionToken',
      isId: false,
      isUnique: true,
      seq,
    }),
    expires: getScalarFieldValueGenerator().DateTime({
      modelName: 'Session',
      fieldName: 'expires',
      isId: false,
      isUnique: false,
      seq,
    }),
  }
}

function defineSessionFactoryInternal<
  TOptions extends SessionFactoryDefineOptions,
>({
  defaultData: defaultDataResolver,
  traits: traitsDefs = {},
}: TOptions): SessionFactoryInterface<TOptions> {
  const getFactoryWithTraits = (
    traitKeys: readonly SessionTraitKeys<TOptions>[] = [],
  ) => {
    const seqKey = {}
    const getSeq = () => getSequenceCounter(seqKey)
    const screen = createScreener('Session', modelFieldDefinitions)
    const build = async (
      inputData: Partial<Prisma.SessionCreateInput> = {},
    ) => {
      const seq = getSeq()
      const requiredScalarData = autoGenerateSessionScalarsOrEnums({ seq })
      const resolveValue = normalizeResolver<
        SessionFactoryDefineInput,
        BuildDataOptions
      >(defaultDataResolver ?? {})
      const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
        const acc = await queue
        const resolveTraitValue = normalizeResolver<
          Partial<SessionFactoryDefineInput>,
          BuildDataOptions
        >(traitsDefs[traitKey]?.data ?? {})
        const traitData = await resolveTraitValue({ seq })
        return {
          ...acc,
          ...traitData,
        }
      }, resolveValue({ seq }))
      const defaultAssociations = {
        user: isSessionuserFactory(defaultData.user)
          ? {
              create: await defaultData.user.build(),
            }
          : defaultData.user,
      }
      const data: Prisma.SessionCreateInput = {
        ...requiredScalarData,
        ...defaultData,
        ...defaultAssociations,
        ...inputData,
      }
      return data
    }
    const buildList = (
      inputData: number | readonly Partial<Prisma.SessionCreateInput>[],
    ) => Promise.all(normalizeList(inputData).map((data) => build(data)))
    const pickForConnect = (inputData: Session) => ({
      id: inputData.id,
    })
    const create = async (
      inputData: Partial<Prisma.SessionCreateInput> = {},
    ) => {
      const data = await build(inputData).then(screen)
      return await getClient<PrismaClient>().session.create({ data })
    }
    const createList = (
      inputData: number | readonly Partial<Prisma.SessionCreateInput>[],
    ) => Promise.all(normalizeList(inputData).map((data) => create(data)))
    const createForConnect = (
      inputData: Partial<Prisma.SessionCreateInput> = {},
    ) => create(inputData).then(pickForConnect)
    return {
      [factoryFor]: 'Session' as const,
      build,
      buildList,
      buildCreateInput: build,
      pickForConnect,
      create,
      createList,
      createForConnect,
    }
  }
  const factory = getFactoryWithTraits()
  const useTraits = (
    name: SessionTraitKeys<TOptions>,
    ...names: readonly SessionTraitKeys<TOptions>[]
  ) => {
    return getFactoryWithTraits([name, ...names])
  }
  return {
    ...factory,
    use: useTraits,
  }
}

/**
 * Define factory for {@link Session} model.
 *
 * @param options
 * @returns factory {@link SessionFactoryInterface}
 */
export function defineSessionFactory<
  TOptions extends SessionFactoryDefineOptions,
>(options: TOptions): SessionFactoryInterface<TOptions> {
  return defineSessionFactoryInternal(options)
}

type SkillScalarOrEnumFields = {
  name: string
}

type SkilluserFactory = {
  [factoryFor]: 'User'
  build: () => PromiseLike<
    Prisma.UserCreateNestedOneWithoutSkillsInput['create']
  >
}

type SkillFactoryDefineInput = {
  id?: string
  name?: string
  level?: number
  image?: string | null
  createdAt?: Date
  updatedAt?: Date
  user: SkilluserFactory | Prisma.UserCreateNestedOneWithoutSkillsInput
  tags?: Prisma.SkillTagRelationCreateNestedManyWithoutSkillInput
}

type SkillFactoryDefineOptions = {
  defaultData: Resolver<SkillFactoryDefineInput, BuildDataOptions>
  traits?: {
    [traitName: string | symbol]: {
      data: Resolver<Partial<SkillFactoryDefineInput>, BuildDataOptions>
    }
  }
}

function isSkilluserFactory(
  x:
    | SkilluserFactory
    | Prisma.UserCreateNestedOneWithoutSkillsInput
    | undefined,
): x is SkilluserFactory {
  return (x as any)?.[factoryFor] === 'User'
}

type SkillTraitKeys<TOptions extends SkillFactoryDefineOptions> =
  keyof TOptions['traits']

export interface SkillFactoryInterfaceWithoutTraits {
  readonly [factoryFor]: 'Skill'
  build(
    inputData?: Partial<Prisma.SkillCreateInput>,
  ): PromiseLike<Prisma.SkillCreateInput>
  buildCreateInput(
    inputData?: Partial<Prisma.SkillCreateInput>,
  ): PromiseLike<Prisma.SkillCreateInput>
  buildList(
    inputData: number | readonly Partial<Prisma.SkillCreateInput>[],
  ): PromiseLike<Prisma.SkillCreateInput[]>
  pickForConnect(inputData: Skill): Pick<Skill, 'id'>
  create(inputData?: Partial<Prisma.SkillCreateInput>): PromiseLike<Skill>
  createList(
    inputData: number | readonly Partial<Prisma.SkillCreateInput>[],
  ): PromiseLike<Skill[]>
  createForConnect(
    inputData?: Partial<Prisma.SkillCreateInput>,
  ): PromiseLike<Pick<Skill, 'id'>>
}

export interface SkillFactoryInterface<
  TOptions extends SkillFactoryDefineOptions = SkillFactoryDefineOptions,
> extends SkillFactoryInterfaceWithoutTraits {
  use(
    name: SkillTraitKeys<TOptions>,
    ...names: readonly SkillTraitKeys<TOptions>[]
  ): SkillFactoryInterfaceWithoutTraits
}

function autoGenerateSkillScalarsOrEnums({
  seq,
}: {
  readonly seq: number
}): SkillScalarOrEnumFields {
  return {
    name: getScalarFieldValueGenerator().String({
      modelName: 'Skill',
      fieldName: 'name',
      isId: false,
      isUnique: true,
      seq,
    }),
  }
}

function defineSkillFactoryInternal<
  TOptions extends SkillFactoryDefineOptions,
>({
  defaultData: defaultDataResolver,
  traits: traitsDefs = {},
}: TOptions): SkillFactoryInterface<TOptions> {
  const getFactoryWithTraits = (
    traitKeys: readonly SkillTraitKeys<TOptions>[] = [],
  ) => {
    const seqKey = {}
    const getSeq = () => getSequenceCounter(seqKey)
    const screen = createScreener('Skill', modelFieldDefinitions)
    const build = async (inputData: Partial<Prisma.SkillCreateInput> = {}) => {
      const seq = getSeq()
      const requiredScalarData = autoGenerateSkillScalarsOrEnums({ seq })
      const resolveValue = normalizeResolver<
        SkillFactoryDefineInput,
        BuildDataOptions
      >(defaultDataResolver ?? {})
      const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
        const acc = await queue
        const resolveTraitValue = normalizeResolver<
          Partial<SkillFactoryDefineInput>,
          BuildDataOptions
        >(traitsDefs[traitKey]?.data ?? {})
        const traitData = await resolveTraitValue({ seq })
        return {
          ...acc,
          ...traitData,
        }
      }, resolveValue({ seq }))
      const defaultAssociations = {
        user: isSkilluserFactory(defaultData.user)
          ? {
              create: await defaultData.user.build(),
            }
          : defaultData.user,
      }
      const data: Prisma.SkillCreateInput = {
        ...requiredScalarData,
        ...defaultData,
        ...defaultAssociations,
        ...inputData,
      }
      return data
    }
    const buildList = (
      inputData: number | readonly Partial<Prisma.SkillCreateInput>[],
    ) => Promise.all(normalizeList(inputData).map((data) => build(data)))
    const pickForConnect = (inputData: Skill) => ({
      id: inputData.id,
    })
    const create = async (inputData: Partial<Prisma.SkillCreateInput> = {}) => {
      const data = await build(inputData).then(screen)
      return await getClient<PrismaClient>().skill.create({ data })
    }
    const createList = (
      inputData: number | readonly Partial<Prisma.SkillCreateInput>[],
    ) => Promise.all(normalizeList(inputData).map((data) => create(data)))
    const createForConnect = (
      inputData: Partial<Prisma.SkillCreateInput> = {},
    ) => create(inputData).then(pickForConnect)
    return {
      [factoryFor]: 'Skill' as const,
      build,
      buildList,
      buildCreateInput: build,
      pickForConnect,
      create,
      createList,
      createForConnect,
    }
  }
  const factory = getFactoryWithTraits()
  const useTraits = (
    name: SkillTraitKeys<TOptions>,
    ...names: readonly SkillTraitKeys<TOptions>[]
  ) => {
    return getFactoryWithTraits([name, ...names])
  }
  return {
    ...factory,
    use: useTraits,
  }
}

/**
 * Define factory for {@link Skill} model.
 *
 * @param options
 * @returns factory {@link SkillFactoryInterface}
 */
export function defineSkillFactory<TOptions extends SkillFactoryDefineOptions>(
  options: TOptions,
): SkillFactoryInterface<TOptions> {
  return defineSkillFactoryInternal(options)
}

type TagScalarOrEnumFields = {
  name: string
  color: string
}

type TaguserFactory = {
  [factoryFor]: 'User'
  build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutTagsInput['create']>
}

type TagFactoryDefineInput = {
  id?: string
  name?: string
  createdAt?: Date
  updatedAt?: Date
  color?: string
  brief?: string | null
  skills?: Prisma.SkillTagRelationCreateNestedManyWithoutTagInput
  user: TaguserFactory | Prisma.UserCreateNestedOneWithoutTagsInput
}

type TagFactoryDefineOptions = {
  defaultData: Resolver<TagFactoryDefineInput, BuildDataOptions>
  traits?: {
    [traitName: string | symbol]: {
      data: Resolver<Partial<TagFactoryDefineInput>, BuildDataOptions>
    }
  }
}

function isTaguserFactory(
  x: TaguserFactory | Prisma.UserCreateNestedOneWithoutTagsInput | undefined,
): x is TaguserFactory {
  return (x as any)?.[factoryFor] === 'User'
}

type TagTraitKeys<TOptions extends TagFactoryDefineOptions> =
  keyof TOptions['traits']

export interface TagFactoryInterfaceWithoutTraits {
  readonly [factoryFor]: 'Tag'
  build(
    inputData?: Partial<Prisma.TagCreateInput>,
  ): PromiseLike<Prisma.TagCreateInput>
  buildCreateInput(
    inputData?: Partial<Prisma.TagCreateInput>,
  ): PromiseLike<Prisma.TagCreateInput>
  buildList(
    inputData: number | readonly Partial<Prisma.TagCreateInput>[],
  ): PromiseLike<Prisma.TagCreateInput[]>
  pickForConnect(inputData: Tag): Pick<Tag, 'id'>
  create(inputData?: Partial<Prisma.TagCreateInput>): PromiseLike<Tag>
  createList(
    inputData: number | readonly Partial<Prisma.TagCreateInput>[],
  ): PromiseLike<Tag[]>
  createForConnect(
    inputData?: Partial<Prisma.TagCreateInput>,
  ): PromiseLike<Pick<Tag, 'id'>>
}

export interface TagFactoryInterface<
  TOptions extends TagFactoryDefineOptions = TagFactoryDefineOptions,
> extends TagFactoryInterfaceWithoutTraits {
  use(
    name: TagTraitKeys<TOptions>,
    ...names: readonly TagTraitKeys<TOptions>[]
  ): TagFactoryInterfaceWithoutTraits
}

function autoGenerateTagScalarsOrEnums({
  seq,
}: {
  readonly seq: number
}): TagScalarOrEnumFields {
  return {
    name: getScalarFieldValueGenerator().String({
      modelName: 'Tag',
      fieldName: 'name',
      isId: false,
      isUnique: true,
      seq,
    }),
    color: getScalarFieldValueGenerator().String({
      modelName: 'Tag',
      fieldName: 'color',
      isId: false,
      isUnique: false,
      seq,
    }),
  }
}

function defineTagFactoryInternal<TOptions extends TagFactoryDefineOptions>({
  defaultData: defaultDataResolver,
  traits: traitsDefs = {},
}: TOptions): TagFactoryInterface<TOptions> {
  const getFactoryWithTraits = (
    traitKeys: readonly TagTraitKeys<TOptions>[] = [],
  ) => {
    const seqKey = {}
    const getSeq = () => getSequenceCounter(seqKey)
    const screen = createScreener('Tag', modelFieldDefinitions)
    const build = async (inputData: Partial<Prisma.TagCreateInput> = {}) => {
      const seq = getSeq()
      const requiredScalarData = autoGenerateTagScalarsOrEnums({ seq })
      const resolveValue = normalizeResolver<
        TagFactoryDefineInput,
        BuildDataOptions
      >(defaultDataResolver ?? {})
      const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
        const acc = await queue
        const resolveTraitValue = normalizeResolver<
          Partial<TagFactoryDefineInput>,
          BuildDataOptions
        >(traitsDefs[traitKey]?.data ?? {})
        const traitData = await resolveTraitValue({ seq })
        return {
          ...acc,
          ...traitData,
        }
      }, resolveValue({ seq }))
      const defaultAssociations = {
        user: isTaguserFactory(defaultData.user)
          ? {
              create: await defaultData.user.build(),
            }
          : defaultData.user,
      }
      const data: Prisma.TagCreateInput = {
        ...requiredScalarData,
        ...defaultData,
        ...defaultAssociations,
        ...inputData,
      }
      return data
    }
    const buildList = (
      inputData: number | readonly Partial<Prisma.TagCreateInput>[],
    ) => Promise.all(normalizeList(inputData).map((data) => build(data)))
    const pickForConnect = (inputData: Tag) => ({
      id: inputData.id,
    })
    const create = async (inputData: Partial<Prisma.TagCreateInput> = {}) => {
      const data = await build(inputData).then(screen)
      return await getClient<PrismaClient>().tag.create({ data })
    }
    const createList = (
      inputData: number | readonly Partial<Prisma.TagCreateInput>[],
    ) => Promise.all(normalizeList(inputData).map((data) => create(data)))
    const createForConnect = (inputData: Partial<Prisma.TagCreateInput> = {}) =>
      create(inputData).then(pickForConnect)
    return {
      [factoryFor]: 'Tag' as const,
      build,
      buildList,
      buildCreateInput: build,
      pickForConnect,
      create,
      createList,
      createForConnect,
    }
  }
  const factory = getFactoryWithTraits()
  const useTraits = (
    name: TagTraitKeys<TOptions>,
    ...names: readonly TagTraitKeys<TOptions>[]
  ) => {
    return getFactoryWithTraits([name, ...names])
  }
  return {
    ...factory,
    use: useTraits,
  }
}

/**
 * Define factory for {@link Tag} model.
 *
 * @param options
 * @returns factory {@link TagFactoryInterface}
 */
export function defineTagFactory<TOptions extends TagFactoryDefineOptions>(
  options: TOptions,
): TagFactoryInterface<TOptions> {
  return defineTagFactoryInternal(options)
}

type SkillTagRelationScalarOrEnumFields = {}

type SkillTagRelationskillFactory = {
  [factoryFor]: 'Skill'
  build: () => PromiseLike<
    Prisma.SkillCreateNestedOneWithoutTagsInput['create']
  >
}

type SkillTagRelationtagFactory = {
  [factoryFor]: 'Tag'
  build: () => PromiseLike<
    Prisma.TagCreateNestedOneWithoutSkillsInput['create']
  >
}

type SkillTagRelationFactoryDefineInput = {
  createdAt?: Date
  updatedAt?: Date
  skill:
    | SkillTagRelationskillFactory
    | Prisma.SkillCreateNestedOneWithoutTagsInput
  tag: SkillTagRelationtagFactory | Prisma.TagCreateNestedOneWithoutSkillsInput
}

type SkillTagRelationFactoryDefineOptions = {
  defaultData: Resolver<SkillTagRelationFactoryDefineInput, BuildDataOptions>
  traits?: {
    [traitName: string | symbol]: {
      data: Resolver<
        Partial<SkillTagRelationFactoryDefineInput>,
        BuildDataOptions
      >
    }
  }
}

function isSkillTagRelationskillFactory(
  x:
    | SkillTagRelationskillFactory
    | Prisma.SkillCreateNestedOneWithoutTagsInput
    | undefined,
): x is SkillTagRelationskillFactory {
  return (x as any)?.[factoryFor] === 'Skill'
}

function isSkillTagRelationtagFactory(
  x:
    | SkillTagRelationtagFactory
    | Prisma.TagCreateNestedOneWithoutSkillsInput
    | undefined,
): x is SkillTagRelationtagFactory {
  return (x as any)?.[factoryFor] === 'Tag'
}

type SkillTagRelationTraitKeys<
  TOptions extends SkillTagRelationFactoryDefineOptions,
> = keyof TOptions['traits']

export interface SkillTagRelationFactoryInterfaceWithoutTraits {
  readonly [factoryFor]: 'SkillTagRelation'
  build(
    inputData?: Partial<Prisma.SkillTagRelationCreateInput>,
  ): PromiseLike<Prisma.SkillTagRelationCreateInput>
  buildCreateInput(
    inputData?: Partial<Prisma.SkillTagRelationCreateInput>,
  ): PromiseLike<Prisma.SkillTagRelationCreateInput>
  buildList(
    inputData: number | readonly Partial<Prisma.SkillTagRelationCreateInput>[],
  ): PromiseLike<Prisma.SkillTagRelationCreateInput[]>
  pickForConnect(
    inputData: SkillTagRelation,
  ): Pick<SkillTagRelation, 'skillId' | 'tagId'>
  create(
    inputData?: Partial<Prisma.SkillTagRelationCreateInput>,
  ): PromiseLike<SkillTagRelation>
  createList(
    inputData: number | readonly Partial<Prisma.SkillTagRelationCreateInput>[],
  ): PromiseLike<SkillTagRelation[]>
  createForConnect(
    inputData?: Partial<Prisma.SkillTagRelationCreateInput>,
  ): PromiseLike<Pick<SkillTagRelation, 'skillId' | 'tagId'>>
}

export interface SkillTagRelationFactoryInterface<
  TOptions extends
    SkillTagRelationFactoryDefineOptions = SkillTagRelationFactoryDefineOptions,
> extends SkillTagRelationFactoryInterfaceWithoutTraits {
  use(
    name: SkillTagRelationTraitKeys<TOptions>,
    ...names: readonly SkillTagRelationTraitKeys<TOptions>[]
  ): SkillTagRelationFactoryInterfaceWithoutTraits
}

function autoGenerateSkillTagRelationScalarsOrEnums({
  seq,
}: {
  readonly seq: number
}): SkillTagRelationScalarOrEnumFields {
  return {}
}

function defineSkillTagRelationFactoryInternal<
  TOptions extends SkillTagRelationFactoryDefineOptions,
>({
  defaultData: defaultDataResolver,
  traits: traitsDefs = {},
}: TOptions): SkillTagRelationFactoryInterface<TOptions> {
  const getFactoryWithTraits = (
    traitKeys: readonly SkillTagRelationTraitKeys<TOptions>[] = [],
  ) => {
    const seqKey = {}
    const getSeq = () => getSequenceCounter(seqKey)
    const screen = createScreener('SkillTagRelation', modelFieldDefinitions)
    const build = async (
      inputData: Partial<Prisma.SkillTagRelationCreateInput> = {},
    ) => {
      const seq = getSeq()
      const requiredScalarData = autoGenerateSkillTagRelationScalarsOrEnums({
        seq,
      })
      const resolveValue = normalizeResolver<
        SkillTagRelationFactoryDefineInput,
        BuildDataOptions
      >(defaultDataResolver ?? {})
      const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
        const acc = await queue
        const resolveTraitValue = normalizeResolver<
          Partial<SkillTagRelationFactoryDefineInput>,
          BuildDataOptions
        >(traitsDefs[traitKey]?.data ?? {})
        const traitData = await resolveTraitValue({ seq })
        return {
          ...acc,
          ...traitData,
        }
      }, resolveValue({ seq }))
      const defaultAssociations = {
        skill: isSkillTagRelationskillFactory(defaultData.skill)
          ? {
              create: await defaultData.skill.build(),
            }
          : defaultData.skill,
        tag: isSkillTagRelationtagFactory(defaultData.tag)
          ? {
              create: await defaultData.tag.build(),
            }
          : defaultData.tag,
      }
      const data: Prisma.SkillTagRelationCreateInput = {
        ...requiredScalarData,
        ...defaultData,
        ...defaultAssociations,
        ...inputData,
      }
      return data
    }
    const buildList = (
      inputData:
        | number
        | readonly Partial<Prisma.SkillTagRelationCreateInput>[],
    ) => Promise.all(normalizeList(inputData).map((data) => build(data)))
    const pickForConnect = (inputData: SkillTagRelation) => ({
      skillId: inputData.skillId,
      tagId: inputData.tagId,
    })
    const create = async (
      inputData: Partial<Prisma.SkillTagRelationCreateInput> = {},
    ) => {
      const data = await build(inputData).then(screen)
      return await getClient<PrismaClient>().skillTagRelation.create({ data })
    }
    const createList = (
      inputData:
        | number
        | readonly Partial<Prisma.SkillTagRelationCreateInput>[],
    ) => Promise.all(normalizeList(inputData).map((data) => create(data)))
    const createForConnect = (
      inputData: Partial<Prisma.SkillTagRelationCreateInput> = {},
    ) => create(inputData).then(pickForConnect)
    return {
      [factoryFor]: 'SkillTagRelation' as const,
      build,
      buildList,
      buildCreateInput: build,
      pickForConnect,
      create,
      createList,
      createForConnect,
    }
  }
  const factory = getFactoryWithTraits()
  const useTraits = (
    name: SkillTagRelationTraitKeys<TOptions>,
    ...names: readonly SkillTagRelationTraitKeys<TOptions>[]
  ) => {
    return getFactoryWithTraits([name, ...names])
  }
  return {
    ...factory,
    use: useTraits,
  }
}

/**
 * Define factory for {@link SkillTagRelation} model.
 *
 * @param options
 * @returns factory {@link SkillTagRelationFactoryInterface}
 */
export function defineSkillTagRelationFactory<
  TOptions extends SkillTagRelationFactoryDefineOptions,
>(options: TOptions): SkillTagRelationFactoryInterface<TOptions> {
  return defineSkillTagRelationFactoryInternal(options)
}

type WorkScalarOrEnumFields = {}

type WorkuserFactory = {
  [factoryFor]: 'User'
  build: () => PromiseLike<
    Prisma.UserCreateNestedOneWithoutWorksInput['create']
  >
}

type WorkFactoryDefineInput = {
  id?: string
  title?: string | null
  thumbnail?: string | null
  createdAt?: Date
  updatedAt?: Date
  content?: string | null
  pinned?: boolean
  isPrivate?: boolean
  user: WorkuserFactory | Prisma.UserCreateNestedOneWithoutWorksInput
}

type WorkFactoryDefineOptions = {
  defaultData: Resolver<WorkFactoryDefineInput, BuildDataOptions>
  traits?: {
    [traitName: string | symbol]: {
      data: Resolver<Partial<WorkFactoryDefineInput>, BuildDataOptions>
    }
  }
}

function isWorkuserFactory(
  x: WorkuserFactory | Prisma.UserCreateNestedOneWithoutWorksInput | undefined,
): x is WorkuserFactory {
  return (x as any)?.[factoryFor] === 'User'
}

type WorkTraitKeys<TOptions extends WorkFactoryDefineOptions> =
  keyof TOptions['traits']

export interface WorkFactoryInterfaceWithoutTraits {
  readonly [factoryFor]: 'Work'
  build(
    inputData?: Partial<Prisma.WorkCreateInput>,
  ): PromiseLike<Prisma.WorkCreateInput>
  buildCreateInput(
    inputData?: Partial<Prisma.WorkCreateInput>,
  ): PromiseLike<Prisma.WorkCreateInput>
  buildList(
    inputData: number | readonly Partial<Prisma.WorkCreateInput>[],
  ): PromiseLike<Prisma.WorkCreateInput[]>
  pickForConnect(inputData: Work): Pick<Work, 'id'>
  create(inputData?: Partial<Prisma.WorkCreateInput>): PromiseLike<Work>
  createList(
    inputData: number | readonly Partial<Prisma.WorkCreateInput>[],
  ): PromiseLike<Work[]>
  createForConnect(
    inputData?: Partial<Prisma.WorkCreateInput>,
  ): PromiseLike<Pick<Work, 'id'>>
}

export interface WorkFactoryInterface<
  TOptions extends WorkFactoryDefineOptions = WorkFactoryDefineOptions,
> extends WorkFactoryInterfaceWithoutTraits {
  use(
    name: WorkTraitKeys<TOptions>,
    ...names: readonly WorkTraitKeys<TOptions>[]
  ): WorkFactoryInterfaceWithoutTraits
}

function autoGenerateWorkScalarsOrEnums({
  seq,
}: {
  readonly seq: number
}): WorkScalarOrEnumFields {
  return {}
}

function defineWorkFactoryInternal<TOptions extends WorkFactoryDefineOptions>({
  defaultData: defaultDataResolver,
  traits: traitsDefs = {},
}: TOptions): WorkFactoryInterface<TOptions> {
  const getFactoryWithTraits = (
    traitKeys: readonly WorkTraitKeys<TOptions>[] = [],
  ) => {
    const seqKey = {}
    const getSeq = () => getSequenceCounter(seqKey)
    const screen = createScreener('Work', modelFieldDefinitions)
    const build = async (inputData: Partial<Prisma.WorkCreateInput> = {}) => {
      const seq = getSeq()
      const requiredScalarData = autoGenerateWorkScalarsOrEnums({ seq })
      const resolveValue = normalizeResolver<
        WorkFactoryDefineInput,
        BuildDataOptions
      >(defaultDataResolver ?? {})
      const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
        const acc = await queue
        const resolveTraitValue = normalizeResolver<
          Partial<WorkFactoryDefineInput>,
          BuildDataOptions
        >(traitsDefs[traitKey]?.data ?? {})
        const traitData = await resolveTraitValue({ seq })
        return {
          ...acc,
          ...traitData,
        }
      }, resolveValue({ seq }))
      const defaultAssociations = {
        user: isWorkuserFactory(defaultData.user)
          ? {
              create: await defaultData.user.build(),
            }
          : defaultData.user,
      }
      const data: Prisma.WorkCreateInput = {
        ...requiredScalarData,
        ...defaultData,
        ...defaultAssociations,
        ...inputData,
      }
      return data
    }
    const buildList = (
      inputData: number | readonly Partial<Prisma.WorkCreateInput>[],
    ) => Promise.all(normalizeList(inputData).map((data) => build(data)))
    const pickForConnect = (inputData: Work) => ({
      id: inputData.id,
    })
    const create = async (inputData: Partial<Prisma.WorkCreateInput> = {}) => {
      const data = await build(inputData).then(screen)
      return await getClient<PrismaClient>().work.create({ data })
    }
    const createList = (
      inputData: number | readonly Partial<Prisma.WorkCreateInput>[],
    ) => Promise.all(normalizeList(inputData).map((data) => create(data)))
    const createForConnect = (
      inputData: Partial<Prisma.WorkCreateInput> = {},
    ) => create(inputData).then(pickForConnect)
    return {
      [factoryFor]: 'Work' as const,
      build,
      buildList,
      buildCreateInput: build,
      pickForConnect,
      create,
      createList,
      createForConnect,
    }
  }
  const factory = getFactoryWithTraits()
  const useTraits = (
    name: WorkTraitKeys<TOptions>,
    ...names: readonly WorkTraitKeys<TOptions>[]
  ) => {
    return getFactoryWithTraits([name, ...names])
  }
  return {
    ...factory,
    use: useTraits,
  }
}

/**
 * Define factory for {@link Work} model.
 *
 * @param options
 * @returns factory {@link WorkFactoryInterface}
 */
export function defineWorkFactory<TOptions extends WorkFactoryDefineOptions>(
  options: TOptions,
): WorkFactoryInterface<TOptions> {
  return defineWorkFactoryInternal(options)
}

type ArticleTokenScalarOrEnumFields = {
  provider: Provider
  token: string
}

type ArticleTokenuserFactory = {
  [factoryFor]: 'User'
  build: () => PromiseLike<
    Prisma.UserCreateNestedOneWithoutApiTokensInput['create']
  >
}

type ArticleTokenFactoryDefineInput = {
  provider?: Provider
  token?: string
  user:
    | ArticleTokenuserFactory
    | Prisma.UserCreateNestedOneWithoutApiTokensInput
}

type ArticleTokenFactoryDefineOptions = {
  defaultData: Resolver<ArticleTokenFactoryDefineInput, BuildDataOptions>
  traits?: {
    [traitName: string | symbol]: {
      data: Resolver<Partial<ArticleTokenFactoryDefineInput>, BuildDataOptions>
    }
  }
}

function isArticleTokenuserFactory(
  x:
    | ArticleTokenuserFactory
    | Prisma.UserCreateNestedOneWithoutApiTokensInput
    | undefined,
): x is ArticleTokenuserFactory {
  return (x as any)?.[factoryFor] === 'User'
}

type ArticleTokenTraitKeys<TOptions extends ArticleTokenFactoryDefineOptions> =
  keyof TOptions['traits']

export interface ArticleTokenFactoryInterfaceWithoutTraits {
  readonly [factoryFor]: 'ArticleToken'
  build(
    inputData?: Partial<Prisma.ArticleTokenCreateInput>,
  ): PromiseLike<Prisma.ArticleTokenCreateInput>
  buildCreateInput(
    inputData?: Partial<Prisma.ArticleTokenCreateInput>,
  ): PromiseLike<Prisma.ArticleTokenCreateInput>
  buildList(
    inputData: number | readonly Partial<Prisma.ArticleTokenCreateInput>[],
  ): PromiseLike<Prisma.ArticleTokenCreateInput[]>
  pickForConnect(
    inputData: ArticleToken,
  ): Pick<ArticleToken, 'provider' | 'userId'>
  create(
    inputData?: Partial<Prisma.ArticleTokenCreateInput>,
  ): PromiseLike<ArticleToken>
  createList(
    inputData: number | readonly Partial<Prisma.ArticleTokenCreateInput>[],
  ): PromiseLike<ArticleToken[]>
  createForConnect(
    inputData?: Partial<Prisma.ArticleTokenCreateInput>,
  ): PromiseLike<Pick<ArticleToken, 'provider' | 'userId'>>
}

export interface ArticleTokenFactoryInterface<
  TOptions extends
    ArticleTokenFactoryDefineOptions = ArticleTokenFactoryDefineOptions,
> extends ArticleTokenFactoryInterfaceWithoutTraits {
  use(
    name: ArticleTokenTraitKeys<TOptions>,
    ...names: readonly ArticleTokenTraitKeys<TOptions>[]
  ): ArticleTokenFactoryInterfaceWithoutTraits
}

function autoGenerateArticleTokenScalarsOrEnums({
  seq,
}: {
  readonly seq: number
}): ArticleTokenScalarOrEnumFields {
  return {
    provider: 'QIITA',
    token: getScalarFieldValueGenerator().String({
      modelName: 'ArticleToken',
      fieldName: 'token',
      isId: false,
      isUnique: false,
      seq,
    }),
  }
}

function defineArticleTokenFactoryInternal<
  TOptions extends ArticleTokenFactoryDefineOptions,
>({
  defaultData: defaultDataResolver,
  traits: traitsDefs = {},
}: TOptions): ArticleTokenFactoryInterface<TOptions> {
  const getFactoryWithTraits = (
    traitKeys: readonly ArticleTokenTraitKeys<TOptions>[] = [],
  ) => {
    const seqKey = {}
    const getSeq = () => getSequenceCounter(seqKey)
    const screen = createScreener('ArticleToken', modelFieldDefinitions)
    const build = async (
      inputData: Partial<Prisma.ArticleTokenCreateInput> = {},
    ) => {
      const seq = getSeq()
      const requiredScalarData = autoGenerateArticleTokenScalarsOrEnums({ seq })
      const resolveValue = normalizeResolver<
        ArticleTokenFactoryDefineInput,
        BuildDataOptions
      >(defaultDataResolver ?? {})
      const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
        const acc = await queue
        const resolveTraitValue = normalizeResolver<
          Partial<ArticleTokenFactoryDefineInput>,
          BuildDataOptions
        >(traitsDefs[traitKey]?.data ?? {})
        const traitData = await resolveTraitValue({ seq })
        return {
          ...acc,
          ...traitData,
        }
      }, resolveValue({ seq }))
      const defaultAssociations = {
        user: isArticleTokenuserFactory(defaultData.user)
          ? {
              create: await defaultData.user.build(),
            }
          : defaultData.user,
      }
      const data: Prisma.ArticleTokenCreateInput = {
        ...requiredScalarData,
        ...defaultData,
        ...defaultAssociations,
        ...inputData,
      }
      return data
    }
    const buildList = (
      inputData: number | readonly Partial<Prisma.ArticleTokenCreateInput>[],
    ) => Promise.all(normalizeList(inputData).map((data) => build(data)))
    const pickForConnect = (inputData: ArticleToken) => ({
      provider: inputData.provider,
      userId: inputData.userId,
    })
    const create = async (
      inputData: Partial<Prisma.ArticleTokenCreateInput> = {},
    ) => {
      const data = await build(inputData).then(screen)
      return await getClient<PrismaClient>().articleToken.create({ data })
    }
    const createList = (
      inputData: number | readonly Partial<Prisma.ArticleTokenCreateInput>[],
    ) => Promise.all(normalizeList(inputData).map((data) => create(data)))
    const createForConnect = (
      inputData: Partial<Prisma.ArticleTokenCreateInput> = {},
    ) => create(inputData).then(pickForConnect)
    return {
      [factoryFor]: 'ArticleToken' as const,
      build,
      buildList,
      buildCreateInput: build,
      pickForConnect,
      create,
      createList,
      createForConnect,
    }
  }
  const factory = getFactoryWithTraits()
  const useTraits = (
    name: ArticleTokenTraitKeys<TOptions>,
    ...names: readonly ArticleTokenTraitKeys<TOptions>[]
  ) => {
    return getFactoryWithTraits([name, ...names])
  }
  return {
    ...factory,
    use: useTraits,
  }
}

/**
 * Define factory for {@link ArticleToken} model.
 *
 * @param options
 * @returns factory {@link ArticleTokenFactoryInterface}
 */
export function defineArticleTokenFactory<
  TOptions extends ArticleTokenFactoryDefineOptions,
>(options: TOptions): ArticleTokenFactoryInterface<TOptions> {
  return defineArticleTokenFactoryInternal(options)
}

type UserScalarOrEnumFields = {}

type UserFactoryDefineInput = {
  id?: string
  name?: string | null
  email?: string | null
  emailVerified?: Date | null
  image?: string | null
  location?: string | null
  organization?: string | null
  bio?: string | null
  accounts?: Prisma.AccountCreateNestedManyWithoutUserInput
  apiTokens?: Prisma.ArticleTokenCreateNestedManyWithoutUserInput
  sessions?: Prisma.SessionCreateNestedManyWithoutUserInput
  skills?: Prisma.SkillCreateNestedManyWithoutUserInput
  tags?: Prisma.TagCreateNestedManyWithoutUserInput
  works?: Prisma.WorkCreateNestedManyWithoutUserInput
}

type UserFactoryDefineOptions = {
  defaultData?: Resolver<UserFactoryDefineInput, BuildDataOptions>
  traits?: {
    [traitName: string | symbol]: {
      data: Resolver<Partial<UserFactoryDefineInput>, BuildDataOptions>
    }
  }
}

type UserTraitKeys<TOptions extends UserFactoryDefineOptions> =
  keyof TOptions['traits']

export interface UserFactoryInterfaceWithoutTraits {
  readonly [factoryFor]: 'User'
  build(
    inputData?: Partial<Prisma.UserCreateInput>,
  ): PromiseLike<Prisma.UserCreateInput>
  buildCreateInput(
    inputData?: Partial<Prisma.UserCreateInput>,
  ): PromiseLike<Prisma.UserCreateInput>
  buildList(
    inputData: number | readonly Partial<Prisma.UserCreateInput>[],
  ): PromiseLike<Prisma.UserCreateInput[]>
  pickForConnect(inputData: User): Pick<User, 'id'>
  create(inputData?: Partial<Prisma.UserCreateInput>): PromiseLike<User>
  createList(
    inputData: number | readonly Partial<Prisma.UserCreateInput>[],
  ): PromiseLike<User[]>
  createForConnect(
    inputData?: Partial<Prisma.UserCreateInput>,
  ): PromiseLike<Pick<User, 'id'>>
}

export interface UserFactoryInterface<
  TOptions extends UserFactoryDefineOptions = UserFactoryDefineOptions,
> extends UserFactoryInterfaceWithoutTraits {
  use(
    name: UserTraitKeys<TOptions>,
    ...names: readonly UserTraitKeys<TOptions>[]
  ): UserFactoryInterfaceWithoutTraits
}

function autoGenerateUserScalarsOrEnums({
  seq,
}: {
  readonly seq: number
}): UserScalarOrEnumFields {
  return {}
}

function defineUserFactoryInternal<TOptions extends UserFactoryDefineOptions>({
  defaultData: defaultDataResolver,
  traits: traitsDefs = {},
}: TOptions): UserFactoryInterface<TOptions> {
  const getFactoryWithTraits = (
    traitKeys: readonly UserTraitKeys<TOptions>[] = [],
  ) => {
    const seqKey = {}
    const getSeq = () => getSequenceCounter(seqKey)
    const screen = createScreener('User', modelFieldDefinitions)
    const build = async (inputData: Partial<Prisma.UserCreateInput> = {}) => {
      const seq = getSeq()
      const requiredScalarData = autoGenerateUserScalarsOrEnums({ seq })
      const resolveValue = normalizeResolver<
        UserFactoryDefineInput,
        BuildDataOptions
      >(defaultDataResolver ?? {})
      const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
        const acc = await queue
        const resolveTraitValue = normalizeResolver<
          Partial<UserFactoryDefineInput>,
          BuildDataOptions
        >(traitsDefs[traitKey]?.data ?? {})
        const traitData = await resolveTraitValue({ seq })
        return {
          ...acc,
          ...traitData,
        }
      }, resolveValue({ seq }))
      const defaultAssociations = {}
      const data: Prisma.UserCreateInput = {
        ...requiredScalarData,
        ...defaultData,
        ...defaultAssociations,
        ...inputData,
      }
      return data
    }
    const buildList = (
      inputData: number | readonly Partial<Prisma.UserCreateInput>[],
    ) => Promise.all(normalizeList(inputData).map((data) => build(data)))
    const pickForConnect = (inputData: User) => ({
      id: inputData.id,
    })
    const create = async (inputData: Partial<Prisma.UserCreateInput> = {}) => {
      const data = await build(inputData).then(screen)
      return await getClient<PrismaClient>().user.create({ data })
    }
    const createList = (
      inputData: number | readonly Partial<Prisma.UserCreateInput>[],
    ) => Promise.all(normalizeList(inputData).map((data) => create(data)))
    const createForConnect = (
      inputData: Partial<Prisma.UserCreateInput> = {},
    ) => create(inputData).then(pickForConnect)
    return {
      [factoryFor]: 'User' as const,
      build,
      buildList,
      buildCreateInput: build,
      pickForConnect,
      create,
      createList,
      createForConnect,
    }
  }
  const factory = getFactoryWithTraits()
  const useTraits = (
    name: UserTraitKeys<TOptions>,
    ...names: readonly UserTraitKeys<TOptions>[]
  ) => {
    return getFactoryWithTraits([name, ...names])
  }
  return {
    ...factory,
    use: useTraits,
  }
}

/**
 * Define factory for {@link User} model.
 *
 * @param options
 * @returns factory {@link UserFactoryInterface}
 */
export function defineUserFactory<TOptions extends UserFactoryDefineOptions>(
  options?: TOptions,
): UserFactoryInterface<TOptions> {
  return defineUserFactoryInternal(options ?? {})
}

type VerificationTokenScalarOrEnumFields = {
  identifier: string
  token: string
  expires: Date
}

type VerificationTokenFactoryDefineInput = {
  identifier?: string
  token?: string
  expires?: Date
}

type VerificationTokenFactoryDefineOptions = {
  defaultData?: Resolver<VerificationTokenFactoryDefineInput, BuildDataOptions>
  traits?: {
    [traitName: string | symbol]: {
      data: Resolver<
        Partial<VerificationTokenFactoryDefineInput>,
        BuildDataOptions
      >
    }
  }
}

type VerificationTokenTraitKeys<
  TOptions extends VerificationTokenFactoryDefineOptions,
> = keyof TOptions['traits']

export interface VerificationTokenFactoryInterfaceWithoutTraits {
  readonly [factoryFor]: 'VerificationToken'
  build(
    inputData?: Partial<Prisma.VerificationTokenCreateInput>,
  ): PromiseLike<Prisma.VerificationTokenCreateInput>
  buildCreateInput(
    inputData?: Partial<Prisma.VerificationTokenCreateInput>,
  ): PromiseLike<Prisma.VerificationTokenCreateInput>
  buildList(
    inputData: number | readonly Partial<Prisma.VerificationTokenCreateInput>[],
  ): PromiseLike<Prisma.VerificationTokenCreateInput[]>
  pickForConnect(inputData: VerificationToken): Pick<VerificationToken, 'token'>
  create(
    inputData?: Partial<Prisma.VerificationTokenCreateInput>,
  ): PromiseLike<VerificationToken>
  createList(
    inputData: number | readonly Partial<Prisma.VerificationTokenCreateInput>[],
  ): PromiseLike<VerificationToken[]>
  createForConnect(
    inputData?: Partial<Prisma.VerificationTokenCreateInput>,
  ): PromiseLike<Pick<VerificationToken, 'token'>>
}

export interface VerificationTokenFactoryInterface<
  TOptions extends
    VerificationTokenFactoryDefineOptions = VerificationTokenFactoryDefineOptions,
> extends VerificationTokenFactoryInterfaceWithoutTraits {
  use(
    name: VerificationTokenTraitKeys<TOptions>,
    ...names: readonly VerificationTokenTraitKeys<TOptions>[]
  ): VerificationTokenFactoryInterfaceWithoutTraits
}

function autoGenerateVerificationTokenScalarsOrEnums({
  seq,
}: {
  readonly seq: number
}): VerificationTokenScalarOrEnumFields {
  return {
    identifier: getScalarFieldValueGenerator().String({
      modelName: 'VerificationToken',
      fieldName: 'identifier',
      isId: false,
      isUnique: true,
      seq,
    }),
    token: getScalarFieldValueGenerator().String({
      modelName: 'VerificationToken',
      fieldName: 'token',
      isId: false,
      isUnique: true,
      seq,
    }),
    expires: getScalarFieldValueGenerator().DateTime({
      modelName: 'VerificationToken',
      fieldName: 'expires',
      isId: false,
      isUnique: false,
      seq,
    }),
  }
}

function defineVerificationTokenFactoryInternal<
  TOptions extends VerificationTokenFactoryDefineOptions,
>({
  defaultData: defaultDataResolver,
  traits: traitsDefs = {},
}: TOptions): VerificationTokenFactoryInterface<TOptions> {
  const getFactoryWithTraits = (
    traitKeys: readonly VerificationTokenTraitKeys<TOptions>[] = [],
  ) => {
    const seqKey = {}
    const getSeq = () => getSequenceCounter(seqKey)
    const screen = createScreener('VerificationToken', modelFieldDefinitions)
    const build = async (
      inputData: Partial<Prisma.VerificationTokenCreateInput> = {},
    ) => {
      const seq = getSeq()
      const requiredScalarData = autoGenerateVerificationTokenScalarsOrEnums({
        seq,
      })
      const resolveValue = normalizeResolver<
        VerificationTokenFactoryDefineInput,
        BuildDataOptions
      >(defaultDataResolver ?? {})
      const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
        const acc = await queue
        const resolveTraitValue = normalizeResolver<
          Partial<VerificationTokenFactoryDefineInput>,
          BuildDataOptions
        >(traitsDefs[traitKey]?.data ?? {})
        const traitData = await resolveTraitValue({ seq })
        return {
          ...acc,
          ...traitData,
        }
      }, resolveValue({ seq }))
      const defaultAssociations = {}
      const data: Prisma.VerificationTokenCreateInput = {
        ...requiredScalarData,
        ...defaultData,
        ...defaultAssociations,
        ...inputData,
      }
      return data
    }
    const buildList = (
      inputData:
        | number
        | readonly Partial<Prisma.VerificationTokenCreateInput>[],
    ) => Promise.all(normalizeList(inputData).map((data) => build(data)))
    const pickForConnect = (inputData: VerificationToken) => ({
      token: inputData.token,
    })
    const create = async (
      inputData: Partial<Prisma.VerificationTokenCreateInput> = {},
    ) => {
      const data = await build(inputData).then(screen)
      return await getClient<PrismaClient>().verificationToken.create({ data })
    }
    const createList = (
      inputData:
        | number
        | readonly Partial<Prisma.VerificationTokenCreateInput>[],
    ) => Promise.all(normalizeList(inputData).map((data) => create(data)))
    const createForConnect = (
      inputData: Partial<Prisma.VerificationTokenCreateInput> = {},
    ) => create(inputData).then(pickForConnect)
    return {
      [factoryFor]: 'VerificationToken' as const,
      build,
      buildList,
      buildCreateInput: build,
      pickForConnect,
      create,
      createList,
      createForConnect,
    }
  }
  const factory = getFactoryWithTraits()
  const useTraits = (
    name: VerificationTokenTraitKeys<TOptions>,
    ...names: readonly VerificationTokenTraitKeys<TOptions>[]
  ) => {
    return getFactoryWithTraits([name, ...names])
  }
  return {
    ...factory,
    use: useTraits,
  }
}

/**
 * Define factory for {@link VerificationToken} model.
 *
 * @param options
 * @returns factory {@link VerificationTokenFactoryInterface}
 */
export function defineVerificationTokenFactory<
  TOptions extends VerificationTokenFactoryDefineOptions,
>(options?: TOptions): VerificationTokenFactoryInterface<TOptions> {
  return defineVerificationTokenFactoryInternal(options ?? {})
}
