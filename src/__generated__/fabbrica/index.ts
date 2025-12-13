import type { Account } from "@prisma/client";
import type { Session } from "@prisma/client";
import type { Skill } from "@prisma/client";
import type { Tag } from "@prisma/client";
import type { SkillTagRelation } from "@prisma/client";
import type { Work } from "@prisma/client";
import type { ArticleToken } from "@prisma/client";
import type { User } from "@prisma/client";
import type { VerificationToken } from "@prisma/client";
import type { Provider } from "@prisma/client";
import type { Prisma, PrismaClient } from "@prisma/client";
import { createInitializer, createScreener, getScalarFieldValueGenerator, normalizeResolver, normalizeList, getSequenceCounter, createCallbackChain, destructure } from "@quramy/prisma-fabbrica/lib/internal";
import type { ModelWithFields, Resolver, } from "@quramy/prisma-fabbrica/lib/internal";
export { resetSequence, registerScalarFieldValueGenerator, resetScalarFieldValueGenerator } from "@quramy/prisma-fabbrica/lib/internal";

type BuildDataOptions<TTransients extends Record<string, unknown>> = {
    readonly seq: number;
} & TTransients;

type TraitName = string | symbol;

type CallbackDefineOptions<TCreated, TCreateInput, TTransients extends Record<string, unknown>> = {
    onAfterBuild?: (createInput: TCreateInput, transientFields: TTransients) => void | PromiseLike<void>;
    onBeforeCreate?: (createInput: TCreateInput, transientFields: TTransients) => void | PromiseLike<void>;
    onAfterCreate?: (created: TCreated, transientFields: TTransients) => void | PromiseLike<void>;
};

const initializer = createInitializer();

const { getClient } = initializer;

export const { initialize } = initializer;

const modelFieldDefinitions: ModelWithFields[] = [{
        name: "Account",
        fields: [{
                name: "user",
                type: "User",
                relationName: "AccountToUser"
            }]
    }, {
        name: "Session",
        fields: [{
                name: "user",
                type: "User",
                relationName: "SessionToUser"
            }]
    }, {
        name: "Skill",
        fields: [{
                name: "user",
                type: "User",
                relationName: "SkillToUser"
            }, {
                name: "tags",
                type: "SkillTagRelation",
                relationName: "SkillToSkillTagRelation"
            }]
    }, {
        name: "Tag",
        fields: [{
                name: "skills",
                type: "SkillTagRelation",
                relationName: "SkillTagRelationToTag"
            }, {
                name: "user",
                type: "User",
                relationName: "TagToUser"
            }]
    }, {
        name: "SkillTagRelation",
        fields: [{
                name: "skill",
                type: "Skill",
                relationName: "SkillToSkillTagRelation"
            }, {
                name: "tag",
                type: "Tag",
                relationName: "SkillTagRelationToTag"
            }]
    }, {
        name: "Work",
        fields: [{
                name: "user",
                type: "User",
                relationName: "UserToWork"
            }]
    }, {
        name: "ArticleToken",
        fields: [{
                name: "user",
                type: "User",
                relationName: "ArticleTokenToUser"
            }]
    }, {
        name: "User",
        fields: [{
                name: "accounts",
                type: "Account",
                relationName: "AccountToUser"
            }, {
                name: "apiTokens",
                type: "ArticleToken",
                relationName: "ArticleTokenToUser"
            }, {
                name: "sessions",
                type: "Session",
                relationName: "SessionToUser"
            }, {
                name: "skills",
                type: "Skill",
                relationName: "SkillToUser"
            }, {
                name: "tags",
                type: "Tag",
                relationName: "TagToUser"
            }, {
                name: "works",
                type: "Work",
                relationName: "UserToWork"
            }]
    }, {
        name: "VerificationToken",
        fields: []
    }];

type AccountScalarOrEnumFields = {
    type: string;
    provider: string;
    providerAccountId: string;
};

type AccountuserFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutAccountsInput["create"]>;
};

type AccountFactoryDefineInput = {
    id?: string;
    type?: string;
    provider?: string;
    providerAccountId?: string;
    refresh_token?: string | null;
    access_token?: string | null;
    expires_at?: number | null;
    token_type?: string | null;
    scope?: string | null;
    id_token?: string | null;
    session_state?: string | null;
    user: AccountuserFactory | Prisma.UserCreateNestedOneWithoutAccountsInput;
};

type AccountTransientFields = Record<string, unknown> & Partial<Record<keyof AccountFactoryDefineInput, never>>;

type AccountFactoryTrait<TTransients extends Record<string, unknown>> = {
    data?: Resolver<Partial<AccountFactoryDefineInput>, BuildDataOptions<TTransients>>;
} & CallbackDefineOptions<Account, Prisma.AccountCreateInput, TTransients>;

type AccountFactoryDefineOptions<TTransients extends Record<string, unknown> = Record<string, unknown>> = {
    defaultData: Resolver<AccountFactoryDefineInput, BuildDataOptions<TTransients>>;
    traits?: {
        [traitName: string | symbol]: AccountFactoryTrait<TTransients>;
    };
} & CallbackDefineOptions<Account, Prisma.AccountCreateInput, TTransients>;

function isAccountuserFactory(x: AccountuserFactory | Prisma.UserCreateNestedOneWithoutAccountsInput | undefined): x is AccountuserFactory {
    return (x as any)?._factoryFor === "User";
}

type AccountTraitKeys<TOptions extends AccountFactoryDefineOptions<any>> = Exclude<keyof TOptions["traits"], number>;

export interface AccountFactoryInterfaceWithoutTraits<TTransients extends Record<string, unknown>> {
    readonly _factoryFor: "Account";
    build(inputData?: Partial<Prisma.AccountCreateInput & TTransients>): PromiseLike<Prisma.AccountCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.AccountCreateInput & TTransients>): PromiseLike<Prisma.AccountCreateInput>;
    buildList(list: readonly Partial<Prisma.AccountCreateInput & TTransients>[]): PromiseLike<Prisma.AccountCreateInput[]>;
    buildList(count: number, item?: Partial<Prisma.AccountCreateInput & TTransients>): PromiseLike<Prisma.AccountCreateInput[]>;
    pickForConnect(inputData: Account): Pick<Account, "id">;
    create(inputData?: Partial<Prisma.AccountCreateInput & TTransients>): PromiseLike<Account>;
    createList(list: readonly Partial<Prisma.AccountCreateInput & TTransients>[]): PromiseLike<Account[]>;
    createList(count: number, item?: Partial<Prisma.AccountCreateInput & TTransients>): PromiseLike<Account[]>;
    createForConnect(inputData?: Partial<Prisma.AccountCreateInput & TTransients>): PromiseLike<Pick<Account, "id">>;
}

export interface AccountFactoryInterface<TTransients extends Record<string, unknown> = Record<string, unknown>, TTraitName extends TraitName = TraitName> extends AccountFactoryInterfaceWithoutTraits<TTransients> {
    use(name: TTraitName, ...names: readonly TTraitName[]): AccountFactoryInterfaceWithoutTraits<TTransients>;
}

function autoGenerateAccountScalarsOrEnums({ seq }: {
    readonly seq: number;
}): AccountScalarOrEnumFields {
    return {
        type: getScalarFieldValueGenerator().String({ modelName: "Account", fieldName: "type", isId: false, isUnique: false, seq }),
        provider: getScalarFieldValueGenerator().String({ modelName: "Account", fieldName: "provider", isId: false, isUnique: true, seq }),
        providerAccountId: getScalarFieldValueGenerator().String({ modelName: "Account", fieldName: "providerAccountId", isId: false, isUnique: true, seq })
    };
}

function defineAccountFactoryInternal<TTransients extends Record<string, unknown>, TOptions extends AccountFactoryDefineOptions<TTransients>>({ defaultData: defaultDataResolver, onAfterBuild, onBeforeCreate, onAfterCreate, traits: traitsDefs = {} }: TOptions, defaultTransientFieldValues: TTransients): AccountFactoryInterface<TTransients, AccountTraitKeys<TOptions>> {
    const getFactoryWithTraits = (traitKeys: readonly AccountTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("Account", modelFieldDefinitions);
        const handleAfterBuild = createCallbackChain([
            onAfterBuild,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterBuild),
        ]);
        const handleBeforeCreate = createCallbackChain([
            ...traitKeys.slice().reverse().map(traitKey => traitsDefs[traitKey]?.onBeforeCreate),
            onBeforeCreate,
        ]);
        const handleAfterCreate = createCallbackChain([
            onAfterCreate,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterCreate),
        ]);
        const build = async (inputData: Partial<Prisma.AccountCreateInput & TTransients> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateAccountScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<AccountFactoryDefineInput, BuildDataOptions<any>>(defaultDataResolver);
            const [transientFields, filteredInputData] = destructure(defaultTransientFieldValues, inputData);
            const resolverInput = { seq, ...transientFields };
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<AccountFactoryDefineInput>, BuildDataOptions<TTransients>>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue(resolverInput);
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue(resolverInput));
            const defaultAssociations = {
                user: isAccountuserFactory(defaultData.user) ? {
                    create: await defaultData.user.build()
                } : defaultData.user
            } as Prisma.AccountCreateInput;
            const data: Prisma.AccountCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...filteredInputData };
            await handleAfterBuild(data, transientFields);
            return data;
        };
        const buildList = (...args: unknown[]) => Promise.all(normalizeList<Partial<Prisma.AccountCreateInput & TTransients>>(...args).map(data => build(data)));
        const pickForConnect = (inputData: Account) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.AccountCreateInput & TTransients> = {}) => {
            const data = await build({ ...inputData }).then(screen);
            const [transientFields] = destructure(defaultTransientFieldValues, inputData);
            await handleBeforeCreate(data, transientFields);
            const createdData = await getClient<PrismaClient>().account.create({ data });
            await handleAfterCreate(createdData, transientFields);
            return createdData;
        };
        const createList = (...args: unknown[]) => Promise.all(normalizeList<Partial<Prisma.AccountCreateInput & TTransients>>(...args).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.AccountCreateInput & TTransients> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "Account" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: AccountTraitKeys<TOptions>, ...names: readonly AccountTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

interface AccountFactoryBuilder {
    <TOptions extends AccountFactoryDefineOptions>(options: TOptions): AccountFactoryInterface<{}, AccountTraitKeys<TOptions>>;
    withTransientFields: <TTransients extends AccountTransientFields>(defaultTransientFieldValues: TTransients) => <TOptions extends AccountFactoryDefineOptions<TTransients>>(options: TOptions) => AccountFactoryInterface<TTransients, AccountTraitKeys<TOptions>>;
}

/**
 * Define factory for {@link Account} model.
 *
 * @param options
 * @returns factory {@link AccountFactoryInterface}
 */
export const defineAccountFactory = (<TOptions extends AccountFactoryDefineOptions>(options: TOptions): AccountFactoryInterface<TOptions> => {
    return defineAccountFactoryInternal(options, {});
}) as AccountFactoryBuilder;

defineAccountFactory.withTransientFields = defaultTransientFieldValues => options => defineAccountFactoryInternal(options, defaultTransientFieldValues);

type SessionScalarOrEnumFields = {
    sessionToken: string;
    expires: Date;
};

type SessionuserFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutSessionsInput["create"]>;
};

type SessionFactoryDefineInput = {
    id?: string;
    sessionToken?: string;
    expires?: Date;
    user: SessionuserFactory | Prisma.UserCreateNestedOneWithoutSessionsInput;
};

type SessionTransientFields = Record<string, unknown> & Partial<Record<keyof SessionFactoryDefineInput, never>>;

type SessionFactoryTrait<TTransients extends Record<string, unknown>> = {
    data?: Resolver<Partial<SessionFactoryDefineInput>, BuildDataOptions<TTransients>>;
} & CallbackDefineOptions<Session, Prisma.SessionCreateInput, TTransients>;

type SessionFactoryDefineOptions<TTransients extends Record<string, unknown> = Record<string, unknown>> = {
    defaultData: Resolver<SessionFactoryDefineInput, BuildDataOptions<TTransients>>;
    traits?: {
        [traitName: string | symbol]: SessionFactoryTrait<TTransients>;
    };
} & CallbackDefineOptions<Session, Prisma.SessionCreateInput, TTransients>;

function isSessionuserFactory(x: SessionuserFactory | Prisma.UserCreateNestedOneWithoutSessionsInput | undefined): x is SessionuserFactory {
    return (x as any)?._factoryFor === "User";
}

type SessionTraitKeys<TOptions extends SessionFactoryDefineOptions<any>> = Exclude<keyof TOptions["traits"], number>;

export interface SessionFactoryInterfaceWithoutTraits<TTransients extends Record<string, unknown>> {
    readonly _factoryFor: "Session";
    build(inputData?: Partial<Prisma.SessionCreateInput & TTransients>): PromiseLike<Prisma.SessionCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.SessionCreateInput & TTransients>): PromiseLike<Prisma.SessionCreateInput>;
    buildList(list: readonly Partial<Prisma.SessionCreateInput & TTransients>[]): PromiseLike<Prisma.SessionCreateInput[]>;
    buildList(count: number, item?: Partial<Prisma.SessionCreateInput & TTransients>): PromiseLike<Prisma.SessionCreateInput[]>;
    pickForConnect(inputData: Session): Pick<Session, "id">;
    create(inputData?: Partial<Prisma.SessionCreateInput & TTransients>): PromiseLike<Session>;
    createList(list: readonly Partial<Prisma.SessionCreateInput & TTransients>[]): PromiseLike<Session[]>;
    createList(count: number, item?: Partial<Prisma.SessionCreateInput & TTransients>): PromiseLike<Session[]>;
    createForConnect(inputData?: Partial<Prisma.SessionCreateInput & TTransients>): PromiseLike<Pick<Session, "id">>;
}

export interface SessionFactoryInterface<TTransients extends Record<string, unknown> = Record<string, unknown>, TTraitName extends TraitName = TraitName> extends SessionFactoryInterfaceWithoutTraits<TTransients> {
    use(name: TTraitName, ...names: readonly TTraitName[]): SessionFactoryInterfaceWithoutTraits<TTransients>;
}

function autoGenerateSessionScalarsOrEnums({ seq }: {
    readonly seq: number;
}): SessionScalarOrEnumFields {
    return {
        sessionToken: getScalarFieldValueGenerator().String({ modelName: "Session", fieldName: "sessionToken", isId: false, isUnique: true, seq }),
        expires: getScalarFieldValueGenerator().DateTime({ modelName: "Session", fieldName: "expires", isId: false, isUnique: false, seq })
    };
}

function defineSessionFactoryInternal<TTransients extends Record<string, unknown>, TOptions extends SessionFactoryDefineOptions<TTransients>>({ defaultData: defaultDataResolver, onAfterBuild, onBeforeCreate, onAfterCreate, traits: traitsDefs = {} }: TOptions, defaultTransientFieldValues: TTransients): SessionFactoryInterface<TTransients, SessionTraitKeys<TOptions>> {
    const getFactoryWithTraits = (traitKeys: readonly SessionTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("Session", modelFieldDefinitions);
        const handleAfterBuild = createCallbackChain([
            onAfterBuild,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterBuild),
        ]);
        const handleBeforeCreate = createCallbackChain([
            ...traitKeys.slice().reverse().map(traitKey => traitsDefs[traitKey]?.onBeforeCreate),
            onBeforeCreate,
        ]);
        const handleAfterCreate = createCallbackChain([
            onAfterCreate,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterCreate),
        ]);
        const build = async (inputData: Partial<Prisma.SessionCreateInput & TTransients> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateSessionScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<SessionFactoryDefineInput, BuildDataOptions<any>>(defaultDataResolver);
            const [transientFields, filteredInputData] = destructure(defaultTransientFieldValues, inputData);
            const resolverInput = { seq, ...transientFields };
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<SessionFactoryDefineInput>, BuildDataOptions<TTransients>>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue(resolverInput);
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue(resolverInput));
            const defaultAssociations = {
                user: isSessionuserFactory(defaultData.user) ? {
                    create: await defaultData.user.build()
                } : defaultData.user
            } as Prisma.SessionCreateInput;
            const data: Prisma.SessionCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...filteredInputData };
            await handleAfterBuild(data, transientFields);
            return data;
        };
        const buildList = (...args: unknown[]) => Promise.all(normalizeList<Partial<Prisma.SessionCreateInput & TTransients>>(...args).map(data => build(data)));
        const pickForConnect = (inputData: Session) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.SessionCreateInput & TTransients> = {}) => {
            const data = await build({ ...inputData }).then(screen);
            const [transientFields] = destructure(defaultTransientFieldValues, inputData);
            await handleBeforeCreate(data, transientFields);
            const createdData = await getClient<PrismaClient>().session.create({ data });
            await handleAfterCreate(createdData, transientFields);
            return createdData;
        };
        const createList = (...args: unknown[]) => Promise.all(normalizeList<Partial<Prisma.SessionCreateInput & TTransients>>(...args).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.SessionCreateInput & TTransients> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "Session" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: SessionTraitKeys<TOptions>, ...names: readonly SessionTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

interface SessionFactoryBuilder {
    <TOptions extends SessionFactoryDefineOptions>(options: TOptions): SessionFactoryInterface<{}, SessionTraitKeys<TOptions>>;
    withTransientFields: <TTransients extends SessionTransientFields>(defaultTransientFieldValues: TTransients) => <TOptions extends SessionFactoryDefineOptions<TTransients>>(options: TOptions) => SessionFactoryInterface<TTransients, SessionTraitKeys<TOptions>>;
}

/**
 * Define factory for {@link Session} model.
 *
 * @param options
 * @returns factory {@link SessionFactoryInterface}
 */
export const defineSessionFactory = (<TOptions extends SessionFactoryDefineOptions>(options: TOptions): SessionFactoryInterface<TOptions> => {
    return defineSessionFactoryInternal(options, {});
}) as SessionFactoryBuilder;

defineSessionFactory.withTransientFields = defaultTransientFieldValues => options => defineSessionFactoryInternal(options, defaultTransientFieldValues);

type SkillScalarOrEnumFields = {
    name: string;
};

type SkilluserFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutSkillsInput["create"]>;
};

type SkillFactoryDefineInput = {
    id?: string;
    name?: string;
    level?: number;
    image?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
    user: SkilluserFactory | Prisma.UserCreateNestedOneWithoutSkillsInput;
    tags?: Prisma.SkillTagRelationCreateNestedManyWithoutSkillInput;
};

type SkillTransientFields = Record<string, unknown> & Partial<Record<keyof SkillFactoryDefineInput, never>>;

type SkillFactoryTrait<TTransients extends Record<string, unknown>> = {
    data?: Resolver<Partial<SkillFactoryDefineInput>, BuildDataOptions<TTransients>>;
} & CallbackDefineOptions<Skill, Prisma.SkillCreateInput, TTransients>;

type SkillFactoryDefineOptions<TTransients extends Record<string, unknown> = Record<string, unknown>> = {
    defaultData: Resolver<SkillFactoryDefineInput, BuildDataOptions<TTransients>>;
    traits?: {
        [traitName: string | symbol]: SkillFactoryTrait<TTransients>;
    };
} & CallbackDefineOptions<Skill, Prisma.SkillCreateInput, TTransients>;

function isSkilluserFactory(x: SkilluserFactory | Prisma.UserCreateNestedOneWithoutSkillsInput | undefined): x is SkilluserFactory {
    return (x as any)?._factoryFor === "User";
}

type SkillTraitKeys<TOptions extends SkillFactoryDefineOptions<any>> = Exclude<keyof TOptions["traits"], number>;

export interface SkillFactoryInterfaceWithoutTraits<TTransients extends Record<string, unknown>> {
    readonly _factoryFor: "Skill";
    build(inputData?: Partial<Prisma.SkillCreateInput & TTransients>): PromiseLike<Prisma.SkillCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.SkillCreateInput & TTransients>): PromiseLike<Prisma.SkillCreateInput>;
    buildList(list: readonly Partial<Prisma.SkillCreateInput & TTransients>[]): PromiseLike<Prisma.SkillCreateInput[]>;
    buildList(count: number, item?: Partial<Prisma.SkillCreateInput & TTransients>): PromiseLike<Prisma.SkillCreateInput[]>;
    pickForConnect(inputData: Skill): Pick<Skill, "id">;
    create(inputData?: Partial<Prisma.SkillCreateInput & TTransients>): PromiseLike<Skill>;
    createList(list: readonly Partial<Prisma.SkillCreateInput & TTransients>[]): PromiseLike<Skill[]>;
    createList(count: number, item?: Partial<Prisma.SkillCreateInput & TTransients>): PromiseLike<Skill[]>;
    createForConnect(inputData?: Partial<Prisma.SkillCreateInput & TTransients>): PromiseLike<Pick<Skill, "id">>;
}

export interface SkillFactoryInterface<TTransients extends Record<string, unknown> = Record<string, unknown>, TTraitName extends TraitName = TraitName> extends SkillFactoryInterfaceWithoutTraits<TTransients> {
    use(name: TTraitName, ...names: readonly TTraitName[]): SkillFactoryInterfaceWithoutTraits<TTransients>;
}

function autoGenerateSkillScalarsOrEnums({ seq }: {
    readonly seq: number;
}): SkillScalarOrEnumFields {
    return {
        name: getScalarFieldValueGenerator().String({ modelName: "Skill", fieldName: "name", isId: false, isUnique: true, seq })
    };
}

function defineSkillFactoryInternal<TTransients extends Record<string, unknown>, TOptions extends SkillFactoryDefineOptions<TTransients>>({ defaultData: defaultDataResolver, onAfterBuild, onBeforeCreate, onAfterCreate, traits: traitsDefs = {} }: TOptions, defaultTransientFieldValues: TTransients): SkillFactoryInterface<TTransients, SkillTraitKeys<TOptions>> {
    const getFactoryWithTraits = (traitKeys: readonly SkillTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("Skill", modelFieldDefinitions);
        const handleAfterBuild = createCallbackChain([
            onAfterBuild,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterBuild),
        ]);
        const handleBeforeCreate = createCallbackChain([
            ...traitKeys.slice().reverse().map(traitKey => traitsDefs[traitKey]?.onBeforeCreate),
            onBeforeCreate,
        ]);
        const handleAfterCreate = createCallbackChain([
            onAfterCreate,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterCreate),
        ]);
        const build = async (inputData: Partial<Prisma.SkillCreateInput & TTransients> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateSkillScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<SkillFactoryDefineInput, BuildDataOptions<any>>(defaultDataResolver);
            const [transientFields, filteredInputData] = destructure(defaultTransientFieldValues, inputData);
            const resolverInput = { seq, ...transientFields };
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<SkillFactoryDefineInput>, BuildDataOptions<TTransients>>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue(resolverInput);
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue(resolverInput));
            const defaultAssociations = {
                user: isSkilluserFactory(defaultData.user) ? {
                    create: await defaultData.user.build()
                } : defaultData.user
            } as Prisma.SkillCreateInput;
            const data: Prisma.SkillCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...filteredInputData };
            await handleAfterBuild(data, transientFields);
            return data;
        };
        const buildList = (...args: unknown[]) => Promise.all(normalizeList<Partial<Prisma.SkillCreateInput & TTransients>>(...args).map(data => build(data)));
        const pickForConnect = (inputData: Skill) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.SkillCreateInput & TTransients> = {}) => {
            const data = await build({ ...inputData }).then(screen);
            const [transientFields] = destructure(defaultTransientFieldValues, inputData);
            await handleBeforeCreate(data, transientFields);
            const createdData = await getClient<PrismaClient>().skill.create({ data });
            await handleAfterCreate(createdData, transientFields);
            return createdData;
        };
        const createList = (...args: unknown[]) => Promise.all(normalizeList<Partial<Prisma.SkillCreateInput & TTransients>>(...args).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.SkillCreateInput & TTransients> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "Skill" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: SkillTraitKeys<TOptions>, ...names: readonly SkillTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

interface SkillFactoryBuilder {
    <TOptions extends SkillFactoryDefineOptions>(options: TOptions): SkillFactoryInterface<{}, SkillTraitKeys<TOptions>>;
    withTransientFields: <TTransients extends SkillTransientFields>(defaultTransientFieldValues: TTransients) => <TOptions extends SkillFactoryDefineOptions<TTransients>>(options: TOptions) => SkillFactoryInterface<TTransients, SkillTraitKeys<TOptions>>;
}

/**
 * Define factory for {@link Skill} model.
 *
 * @param options
 * @returns factory {@link SkillFactoryInterface}
 */
export const defineSkillFactory = (<TOptions extends SkillFactoryDefineOptions>(options: TOptions): SkillFactoryInterface<TOptions> => {
    return defineSkillFactoryInternal(options, {});
}) as SkillFactoryBuilder;

defineSkillFactory.withTransientFields = defaultTransientFieldValues => options => defineSkillFactoryInternal(options, defaultTransientFieldValues);

type TagScalarOrEnumFields = {
    name: string;
    color: string;
};

type TaguserFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutTagsInput["create"]>;
};

type TagFactoryDefineInput = {
    id?: string;
    name?: string;
    createdAt?: Date;
    updatedAt?: Date;
    color?: string;
    brief?: string | null;
    skills?: Prisma.SkillTagRelationCreateNestedManyWithoutTagInput;
    user: TaguserFactory | Prisma.UserCreateNestedOneWithoutTagsInput;
};

type TagTransientFields = Record<string, unknown> & Partial<Record<keyof TagFactoryDefineInput, never>>;

type TagFactoryTrait<TTransients extends Record<string, unknown>> = {
    data?: Resolver<Partial<TagFactoryDefineInput>, BuildDataOptions<TTransients>>;
} & CallbackDefineOptions<Tag, Prisma.TagCreateInput, TTransients>;

type TagFactoryDefineOptions<TTransients extends Record<string, unknown> = Record<string, unknown>> = {
    defaultData: Resolver<TagFactoryDefineInput, BuildDataOptions<TTransients>>;
    traits?: {
        [traitName: string | symbol]: TagFactoryTrait<TTransients>;
    };
} & CallbackDefineOptions<Tag, Prisma.TagCreateInput, TTransients>;

function isTaguserFactory(x: TaguserFactory | Prisma.UserCreateNestedOneWithoutTagsInput | undefined): x is TaguserFactory {
    return (x as any)?._factoryFor === "User";
}

type TagTraitKeys<TOptions extends TagFactoryDefineOptions<any>> = Exclude<keyof TOptions["traits"], number>;

export interface TagFactoryInterfaceWithoutTraits<TTransients extends Record<string, unknown>> {
    readonly _factoryFor: "Tag";
    build(inputData?: Partial<Prisma.TagCreateInput & TTransients>): PromiseLike<Prisma.TagCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.TagCreateInput & TTransients>): PromiseLike<Prisma.TagCreateInput>;
    buildList(list: readonly Partial<Prisma.TagCreateInput & TTransients>[]): PromiseLike<Prisma.TagCreateInput[]>;
    buildList(count: number, item?: Partial<Prisma.TagCreateInput & TTransients>): PromiseLike<Prisma.TagCreateInput[]>;
    pickForConnect(inputData: Tag): Pick<Tag, "id">;
    create(inputData?: Partial<Prisma.TagCreateInput & TTransients>): PromiseLike<Tag>;
    createList(list: readonly Partial<Prisma.TagCreateInput & TTransients>[]): PromiseLike<Tag[]>;
    createList(count: number, item?: Partial<Prisma.TagCreateInput & TTransients>): PromiseLike<Tag[]>;
    createForConnect(inputData?: Partial<Prisma.TagCreateInput & TTransients>): PromiseLike<Pick<Tag, "id">>;
}

export interface TagFactoryInterface<TTransients extends Record<string, unknown> = Record<string, unknown>, TTraitName extends TraitName = TraitName> extends TagFactoryInterfaceWithoutTraits<TTransients> {
    use(name: TTraitName, ...names: readonly TTraitName[]): TagFactoryInterfaceWithoutTraits<TTransients>;
}

function autoGenerateTagScalarsOrEnums({ seq }: {
    readonly seq: number;
}): TagScalarOrEnumFields {
    return {
        name: getScalarFieldValueGenerator().String({ modelName: "Tag", fieldName: "name", isId: false, isUnique: true, seq }),
        color: getScalarFieldValueGenerator().String({ modelName: "Tag", fieldName: "color", isId: false, isUnique: false, seq })
    };
}

function defineTagFactoryInternal<TTransients extends Record<string, unknown>, TOptions extends TagFactoryDefineOptions<TTransients>>({ defaultData: defaultDataResolver, onAfterBuild, onBeforeCreate, onAfterCreate, traits: traitsDefs = {} }: TOptions, defaultTransientFieldValues: TTransients): TagFactoryInterface<TTransients, TagTraitKeys<TOptions>> {
    const getFactoryWithTraits = (traitKeys: readonly TagTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("Tag", modelFieldDefinitions);
        const handleAfterBuild = createCallbackChain([
            onAfterBuild,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterBuild),
        ]);
        const handleBeforeCreate = createCallbackChain([
            ...traitKeys.slice().reverse().map(traitKey => traitsDefs[traitKey]?.onBeforeCreate),
            onBeforeCreate,
        ]);
        const handleAfterCreate = createCallbackChain([
            onAfterCreate,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterCreate),
        ]);
        const build = async (inputData: Partial<Prisma.TagCreateInput & TTransients> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateTagScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<TagFactoryDefineInput, BuildDataOptions<any>>(defaultDataResolver);
            const [transientFields, filteredInputData] = destructure(defaultTransientFieldValues, inputData);
            const resolverInput = { seq, ...transientFields };
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<TagFactoryDefineInput>, BuildDataOptions<TTransients>>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue(resolverInput);
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue(resolverInput));
            const defaultAssociations = {
                user: isTaguserFactory(defaultData.user) ? {
                    create: await defaultData.user.build()
                } : defaultData.user
            } as Prisma.TagCreateInput;
            const data: Prisma.TagCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...filteredInputData };
            await handleAfterBuild(data, transientFields);
            return data;
        };
        const buildList = (...args: unknown[]) => Promise.all(normalizeList<Partial<Prisma.TagCreateInput & TTransients>>(...args).map(data => build(data)));
        const pickForConnect = (inputData: Tag) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.TagCreateInput & TTransients> = {}) => {
            const data = await build({ ...inputData }).then(screen);
            const [transientFields] = destructure(defaultTransientFieldValues, inputData);
            await handleBeforeCreate(data, transientFields);
            const createdData = await getClient<PrismaClient>().tag.create({ data });
            await handleAfterCreate(createdData, transientFields);
            return createdData;
        };
        const createList = (...args: unknown[]) => Promise.all(normalizeList<Partial<Prisma.TagCreateInput & TTransients>>(...args).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.TagCreateInput & TTransients> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "Tag" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: TagTraitKeys<TOptions>, ...names: readonly TagTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

interface TagFactoryBuilder {
    <TOptions extends TagFactoryDefineOptions>(options: TOptions): TagFactoryInterface<{}, TagTraitKeys<TOptions>>;
    withTransientFields: <TTransients extends TagTransientFields>(defaultTransientFieldValues: TTransients) => <TOptions extends TagFactoryDefineOptions<TTransients>>(options: TOptions) => TagFactoryInterface<TTransients, TagTraitKeys<TOptions>>;
}

/**
 * Define factory for {@link Tag} model.
 *
 * @param options
 * @returns factory {@link TagFactoryInterface}
 */
export const defineTagFactory = (<TOptions extends TagFactoryDefineOptions>(options: TOptions): TagFactoryInterface<TOptions> => {
    return defineTagFactoryInternal(options, {});
}) as TagFactoryBuilder;

defineTagFactory.withTransientFields = defaultTransientFieldValues => options => defineTagFactoryInternal(options, defaultTransientFieldValues);

type SkillTagRelationScalarOrEnumFields = {};

type SkillTagRelationskillFactory = {
    _factoryFor: "Skill";
    build: () => PromiseLike<Prisma.SkillCreateNestedOneWithoutTagsInput["create"]>;
};

type SkillTagRelationtagFactory = {
    _factoryFor: "Tag";
    build: () => PromiseLike<Prisma.TagCreateNestedOneWithoutSkillsInput["create"]>;
};

type SkillTagRelationFactoryDefineInput = {
    createdAt?: Date;
    updatedAt?: Date;
    skill: SkillTagRelationskillFactory | Prisma.SkillCreateNestedOneWithoutTagsInput;
    tag: SkillTagRelationtagFactory | Prisma.TagCreateNestedOneWithoutSkillsInput;
};

type SkillTagRelationTransientFields = Record<string, unknown> & Partial<Record<keyof SkillTagRelationFactoryDefineInput, never>>;

type SkillTagRelationFactoryTrait<TTransients extends Record<string, unknown>> = {
    data?: Resolver<Partial<SkillTagRelationFactoryDefineInput>, BuildDataOptions<TTransients>>;
} & CallbackDefineOptions<SkillTagRelation, Prisma.SkillTagRelationCreateInput, TTransients>;

type SkillTagRelationFactoryDefineOptions<TTransients extends Record<string, unknown> = Record<string, unknown>> = {
    defaultData: Resolver<SkillTagRelationFactoryDefineInput, BuildDataOptions<TTransients>>;
    traits?: {
        [traitName: string | symbol]: SkillTagRelationFactoryTrait<TTransients>;
    };
} & CallbackDefineOptions<SkillTagRelation, Prisma.SkillTagRelationCreateInput, TTransients>;

function isSkillTagRelationskillFactory(x: SkillTagRelationskillFactory | Prisma.SkillCreateNestedOneWithoutTagsInput | undefined): x is SkillTagRelationskillFactory {
    return (x as any)?._factoryFor === "Skill";
}

function isSkillTagRelationtagFactory(x: SkillTagRelationtagFactory | Prisma.TagCreateNestedOneWithoutSkillsInput | undefined): x is SkillTagRelationtagFactory {
    return (x as any)?._factoryFor === "Tag";
}

type SkillTagRelationTraitKeys<TOptions extends SkillTagRelationFactoryDefineOptions<any>> = Exclude<keyof TOptions["traits"], number>;

export interface SkillTagRelationFactoryInterfaceWithoutTraits<TTransients extends Record<string, unknown>> {
    readonly _factoryFor: "SkillTagRelation";
    build(inputData?: Partial<Prisma.SkillTagRelationCreateInput & TTransients>): PromiseLike<Prisma.SkillTagRelationCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.SkillTagRelationCreateInput & TTransients>): PromiseLike<Prisma.SkillTagRelationCreateInput>;
    buildList(list: readonly Partial<Prisma.SkillTagRelationCreateInput & TTransients>[]): PromiseLike<Prisma.SkillTagRelationCreateInput[]>;
    buildList(count: number, item?: Partial<Prisma.SkillTagRelationCreateInput & TTransients>): PromiseLike<Prisma.SkillTagRelationCreateInput[]>;
    pickForConnect(inputData: SkillTagRelation): Pick<SkillTagRelation, "skillId" | "tagId">;
    create(inputData?: Partial<Prisma.SkillTagRelationCreateInput & TTransients>): PromiseLike<SkillTagRelation>;
    createList(list: readonly Partial<Prisma.SkillTagRelationCreateInput & TTransients>[]): PromiseLike<SkillTagRelation[]>;
    createList(count: number, item?: Partial<Prisma.SkillTagRelationCreateInput & TTransients>): PromiseLike<SkillTagRelation[]>;
    createForConnect(inputData?: Partial<Prisma.SkillTagRelationCreateInput & TTransients>): PromiseLike<Pick<SkillTagRelation, "skillId" | "tagId">>;
}

export interface SkillTagRelationFactoryInterface<TTransients extends Record<string, unknown> = Record<string, unknown>, TTraitName extends TraitName = TraitName> extends SkillTagRelationFactoryInterfaceWithoutTraits<TTransients> {
    use(name: TTraitName, ...names: readonly TTraitName[]): SkillTagRelationFactoryInterfaceWithoutTraits<TTransients>;
}

function autoGenerateSkillTagRelationScalarsOrEnums({ seq }: {
    readonly seq: number;
}): SkillTagRelationScalarOrEnumFields {
    return {};
}

function defineSkillTagRelationFactoryInternal<TTransients extends Record<string, unknown>, TOptions extends SkillTagRelationFactoryDefineOptions<TTransients>>({ defaultData: defaultDataResolver, onAfterBuild, onBeforeCreate, onAfterCreate, traits: traitsDefs = {} }: TOptions, defaultTransientFieldValues: TTransients): SkillTagRelationFactoryInterface<TTransients, SkillTagRelationTraitKeys<TOptions>> {
    const getFactoryWithTraits = (traitKeys: readonly SkillTagRelationTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("SkillTagRelation", modelFieldDefinitions);
        const handleAfterBuild = createCallbackChain([
            onAfterBuild,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterBuild),
        ]);
        const handleBeforeCreate = createCallbackChain([
            ...traitKeys.slice().reverse().map(traitKey => traitsDefs[traitKey]?.onBeforeCreate),
            onBeforeCreate,
        ]);
        const handleAfterCreate = createCallbackChain([
            onAfterCreate,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterCreate),
        ]);
        const build = async (inputData: Partial<Prisma.SkillTagRelationCreateInput & TTransients> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateSkillTagRelationScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<SkillTagRelationFactoryDefineInput, BuildDataOptions<any>>(defaultDataResolver);
            const [transientFields, filteredInputData] = destructure(defaultTransientFieldValues, inputData);
            const resolverInput = { seq, ...transientFields };
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<SkillTagRelationFactoryDefineInput>, BuildDataOptions<TTransients>>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue(resolverInput);
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue(resolverInput));
            const defaultAssociations = {
                skill: isSkillTagRelationskillFactory(defaultData.skill) ? {
                    create: await defaultData.skill.build()
                } : defaultData.skill,
                tag: isSkillTagRelationtagFactory(defaultData.tag) ? {
                    create: await defaultData.tag.build()
                } : defaultData.tag
            } as Prisma.SkillTagRelationCreateInput;
            const data: Prisma.SkillTagRelationCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...filteredInputData };
            await handleAfterBuild(data, transientFields);
            return data;
        };
        const buildList = (...args: unknown[]) => Promise.all(normalizeList<Partial<Prisma.SkillTagRelationCreateInput & TTransients>>(...args).map(data => build(data)));
        const pickForConnect = (inputData: SkillTagRelation) => ({
            skillId: inputData.skillId,
            tagId: inputData.tagId
        });
        const create = async (inputData: Partial<Prisma.SkillTagRelationCreateInput & TTransients> = {}) => {
            const data = await build({ ...inputData }).then(screen);
            const [transientFields] = destructure(defaultTransientFieldValues, inputData);
            await handleBeforeCreate(data, transientFields);
            const createdData = await getClient<PrismaClient>().skillTagRelation.create({ data });
            await handleAfterCreate(createdData, transientFields);
            return createdData;
        };
        const createList = (...args: unknown[]) => Promise.all(normalizeList<Partial<Prisma.SkillTagRelationCreateInput & TTransients>>(...args).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.SkillTagRelationCreateInput & TTransients> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "SkillTagRelation" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: SkillTagRelationTraitKeys<TOptions>, ...names: readonly SkillTagRelationTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

interface SkillTagRelationFactoryBuilder {
    <TOptions extends SkillTagRelationFactoryDefineOptions>(options: TOptions): SkillTagRelationFactoryInterface<{}, SkillTagRelationTraitKeys<TOptions>>;
    withTransientFields: <TTransients extends SkillTagRelationTransientFields>(defaultTransientFieldValues: TTransients) => <TOptions extends SkillTagRelationFactoryDefineOptions<TTransients>>(options: TOptions) => SkillTagRelationFactoryInterface<TTransients, SkillTagRelationTraitKeys<TOptions>>;
}

/**
 * Define factory for {@link SkillTagRelation} model.
 *
 * @param options
 * @returns factory {@link SkillTagRelationFactoryInterface}
 */
export const defineSkillTagRelationFactory = (<TOptions extends SkillTagRelationFactoryDefineOptions>(options: TOptions): SkillTagRelationFactoryInterface<TOptions> => {
    return defineSkillTagRelationFactoryInternal(options, {});
}) as SkillTagRelationFactoryBuilder;

defineSkillTagRelationFactory.withTransientFields = defaultTransientFieldValues => options => defineSkillTagRelationFactoryInternal(options, defaultTransientFieldValues);

type WorkScalarOrEnumFields = {};

type WorkuserFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutWorksInput["create"]>;
};

type WorkFactoryDefineInput = {
    id?: string;
    title?: string | null;
    thumbnail?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
    content?: string | null;
    pinned?: boolean;
    isPrivate?: boolean;
    user: WorkuserFactory | Prisma.UserCreateNestedOneWithoutWorksInput;
};

type WorkTransientFields = Record<string, unknown> & Partial<Record<keyof WorkFactoryDefineInput, never>>;

type WorkFactoryTrait<TTransients extends Record<string, unknown>> = {
    data?: Resolver<Partial<WorkFactoryDefineInput>, BuildDataOptions<TTransients>>;
} & CallbackDefineOptions<Work, Prisma.WorkCreateInput, TTransients>;

type WorkFactoryDefineOptions<TTransients extends Record<string, unknown> = Record<string, unknown>> = {
    defaultData: Resolver<WorkFactoryDefineInput, BuildDataOptions<TTransients>>;
    traits?: {
        [traitName: string | symbol]: WorkFactoryTrait<TTransients>;
    };
} & CallbackDefineOptions<Work, Prisma.WorkCreateInput, TTransients>;

function isWorkuserFactory(x: WorkuserFactory | Prisma.UserCreateNestedOneWithoutWorksInput | undefined): x is WorkuserFactory {
    return (x as any)?._factoryFor === "User";
}

type WorkTraitKeys<TOptions extends WorkFactoryDefineOptions<any>> = Exclude<keyof TOptions["traits"], number>;

export interface WorkFactoryInterfaceWithoutTraits<TTransients extends Record<string, unknown>> {
    readonly _factoryFor: "Work";
    build(inputData?: Partial<Prisma.WorkCreateInput & TTransients>): PromiseLike<Prisma.WorkCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.WorkCreateInput & TTransients>): PromiseLike<Prisma.WorkCreateInput>;
    buildList(list: readonly Partial<Prisma.WorkCreateInput & TTransients>[]): PromiseLike<Prisma.WorkCreateInput[]>;
    buildList(count: number, item?: Partial<Prisma.WorkCreateInput & TTransients>): PromiseLike<Prisma.WorkCreateInput[]>;
    pickForConnect(inputData: Work): Pick<Work, "id">;
    create(inputData?: Partial<Prisma.WorkCreateInput & TTransients>): PromiseLike<Work>;
    createList(list: readonly Partial<Prisma.WorkCreateInput & TTransients>[]): PromiseLike<Work[]>;
    createList(count: number, item?: Partial<Prisma.WorkCreateInput & TTransients>): PromiseLike<Work[]>;
    createForConnect(inputData?: Partial<Prisma.WorkCreateInput & TTransients>): PromiseLike<Pick<Work, "id">>;
}

export interface WorkFactoryInterface<TTransients extends Record<string, unknown> = Record<string, unknown>, TTraitName extends TraitName = TraitName> extends WorkFactoryInterfaceWithoutTraits<TTransients> {
    use(name: TTraitName, ...names: readonly TTraitName[]): WorkFactoryInterfaceWithoutTraits<TTransients>;
}

function autoGenerateWorkScalarsOrEnums({ seq }: {
    readonly seq: number;
}): WorkScalarOrEnumFields {
    return {};
}

function defineWorkFactoryInternal<TTransients extends Record<string, unknown>, TOptions extends WorkFactoryDefineOptions<TTransients>>({ defaultData: defaultDataResolver, onAfterBuild, onBeforeCreate, onAfterCreate, traits: traitsDefs = {} }: TOptions, defaultTransientFieldValues: TTransients): WorkFactoryInterface<TTransients, WorkTraitKeys<TOptions>> {
    const getFactoryWithTraits = (traitKeys: readonly WorkTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("Work", modelFieldDefinitions);
        const handleAfterBuild = createCallbackChain([
            onAfterBuild,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterBuild),
        ]);
        const handleBeforeCreate = createCallbackChain([
            ...traitKeys.slice().reverse().map(traitKey => traitsDefs[traitKey]?.onBeforeCreate),
            onBeforeCreate,
        ]);
        const handleAfterCreate = createCallbackChain([
            onAfterCreate,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterCreate),
        ]);
        const build = async (inputData: Partial<Prisma.WorkCreateInput & TTransients> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateWorkScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<WorkFactoryDefineInput, BuildDataOptions<any>>(defaultDataResolver);
            const [transientFields, filteredInputData] = destructure(defaultTransientFieldValues, inputData);
            const resolverInput = { seq, ...transientFields };
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<WorkFactoryDefineInput>, BuildDataOptions<TTransients>>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue(resolverInput);
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue(resolverInput));
            const defaultAssociations = {
                user: isWorkuserFactory(defaultData.user) ? {
                    create: await defaultData.user.build()
                } : defaultData.user
            } as Prisma.WorkCreateInput;
            const data: Prisma.WorkCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...filteredInputData };
            await handleAfterBuild(data, transientFields);
            return data;
        };
        const buildList = (...args: unknown[]) => Promise.all(normalizeList<Partial<Prisma.WorkCreateInput & TTransients>>(...args).map(data => build(data)));
        const pickForConnect = (inputData: Work) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.WorkCreateInput & TTransients> = {}) => {
            const data = await build({ ...inputData }).then(screen);
            const [transientFields] = destructure(defaultTransientFieldValues, inputData);
            await handleBeforeCreate(data, transientFields);
            const createdData = await getClient<PrismaClient>().work.create({ data });
            await handleAfterCreate(createdData, transientFields);
            return createdData;
        };
        const createList = (...args: unknown[]) => Promise.all(normalizeList<Partial<Prisma.WorkCreateInput & TTransients>>(...args).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.WorkCreateInput & TTransients> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "Work" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: WorkTraitKeys<TOptions>, ...names: readonly WorkTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

interface WorkFactoryBuilder {
    <TOptions extends WorkFactoryDefineOptions>(options: TOptions): WorkFactoryInterface<{}, WorkTraitKeys<TOptions>>;
    withTransientFields: <TTransients extends WorkTransientFields>(defaultTransientFieldValues: TTransients) => <TOptions extends WorkFactoryDefineOptions<TTransients>>(options: TOptions) => WorkFactoryInterface<TTransients, WorkTraitKeys<TOptions>>;
}

/**
 * Define factory for {@link Work} model.
 *
 * @param options
 * @returns factory {@link WorkFactoryInterface}
 */
export const defineWorkFactory = (<TOptions extends WorkFactoryDefineOptions>(options: TOptions): WorkFactoryInterface<TOptions> => {
    return defineWorkFactoryInternal(options, {});
}) as WorkFactoryBuilder;

defineWorkFactory.withTransientFields = defaultTransientFieldValues => options => defineWorkFactoryInternal(options, defaultTransientFieldValues);

type ArticleTokenScalarOrEnumFields = {
    provider: Provider;
    token: string;
};

type ArticleTokenuserFactory = {
    _factoryFor: "User";
    build: () => PromiseLike<Prisma.UserCreateNestedOneWithoutApiTokensInput["create"]>;
};

type ArticleTokenFactoryDefineInput = {
    provider?: Provider;
    token?: string;
    user: ArticleTokenuserFactory | Prisma.UserCreateNestedOneWithoutApiTokensInput;
};

type ArticleTokenTransientFields = Record<string, unknown> & Partial<Record<keyof ArticleTokenFactoryDefineInput, never>>;

type ArticleTokenFactoryTrait<TTransients extends Record<string, unknown>> = {
    data?: Resolver<Partial<ArticleTokenFactoryDefineInput>, BuildDataOptions<TTransients>>;
} & CallbackDefineOptions<ArticleToken, Prisma.ArticleTokenCreateInput, TTransients>;

type ArticleTokenFactoryDefineOptions<TTransients extends Record<string, unknown> = Record<string, unknown>> = {
    defaultData: Resolver<ArticleTokenFactoryDefineInput, BuildDataOptions<TTransients>>;
    traits?: {
        [traitName: string | symbol]: ArticleTokenFactoryTrait<TTransients>;
    };
} & CallbackDefineOptions<ArticleToken, Prisma.ArticleTokenCreateInput, TTransients>;

function isArticleTokenuserFactory(x: ArticleTokenuserFactory | Prisma.UserCreateNestedOneWithoutApiTokensInput | undefined): x is ArticleTokenuserFactory {
    return (x as any)?._factoryFor === "User";
}

type ArticleTokenTraitKeys<TOptions extends ArticleTokenFactoryDefineOptions<any>> = Exclude<keyof TOptions["traits"], number>;

export interface ArticleTokenFactoryInterfaceWithoutTraits<TTransients extends Record<string, unknown>> {
    readonly _factoryFor: "ArticleToken";
    build(inputData?: Partial<Prisma.ArticleTokenCreateInput & TTransients>): PromiseLike<Prisma.ArticleTokenCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.ArticleTokenCreateInput & TTransients>): PromiseLike<Prisma.ArticleTokenCreateInput>;
    buildList(list: readonly Partial<Prisma.ArticleTokenCreateInput & TTransients>[]): PromiseLike<Prisma.ArticleTokenCreateInput[]>;
    buildList(count: number, item?: Partial<Prisma.ArticleTokenCreateInput & TTransients>): PromiseLike<Prisma.ArticleTokenCreateInput[]>;
    pickForConnect(inputData: ArticleToken): Pick<ArticleToken, "provider" | "userId">;
    create(inputData?: Partial<Prisma.ArticleTokenCreateInput & TTransients>): PromiseLike<ArticleToken>;
    createList(list: readonly Partial<Prisma.ArticleTokenCreateInput & TTransients>[]): PromiseLike<ArticleToken[]>;
    createList(count: number, item?: Partial<Prisma.ArticleTokenCreateInput & TTransients>): PromiseLike<ArticleToken[]>;
    createForConnect(inputData?: Partial<Prisma.ArticleTokenCreateInput & TTransients>): PromiseLike<Pick<ArticleToken, "provider" | "userId">>;
}

export interface ArticleTokenFactoryInterface<TTransients extends Record<string, unknown> = Record<string, unknown>, TTraitName extends TraitName = TraitName> extends ArticleTokenFactoryInterfaceWithoutTraits<TTransients> {
    use(name: TTraitName, ...names: readonly TTraitName[]): ArticleTokenFactoryInterfaceWithoutTraits<TTransients>;
}

function autoGenerateArticleTokenScalarsOrEnums({ seq }: {
    readonly seq: number;
}): ArticleTokenScalarOrEnumFields {
    return {
        provider: "QIITA",
        token: getScalarFieldValueGenerator().String({ modelName: "ArticleToken", fieldName: "token", isId: false, isUnique: false, seq })
    };
}

function defineArticleTokenFactoryInternal<TTransients extends Record<string, unknown>, TOptions extends ArticleTokenFactoryDefineOptions<TTransients>>({ defaultData: defaultDataResolver, onAfterBuild, onBeforeCreate, onAfterCreate, traits: traitsDefs = {} }: TOptions, defaultTransientFieldValues: TTransients): ArticleTokenFactoryInterface<TTransients, ArticleTokenTraitKeys<TOptions>> {
    const getFactoryWithTraits = (traitKeys: readonly ArticleTokenTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("ArticleToken", modelFieldDefinitions);
        const handleAfterBuild = createCallbackChain([
            onAfterBuild,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterBuild),
        ]);
        const handleBeforeCreate = createCallbackChain([
            ...traitKeys.slice().reverse().map(traitKey => traitsDefs[traitKey]?.onBeforeCreate),
            onBeforeCreate,
        ]);
        const handleAfterCreate = createCallbackChain([
            onAfterCreate,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterCreate),
        ]);
        const build = async (inputData: Partial<Prisma.ArticleTokenCreateInput & TTransients> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateArticleTokenScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<ArticleTokenFactoryDefineInput, BuildDataOptions<any>>(defaultDataResolver);
            const [transientFields, filteredInputData] = destructure(defaultTransientFieldValues, inputData);
            const resolverInput = { seq, ...transientFields };
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<ArticleTokenFactoryDefineInput>, BuildDataOptions<TTransients>>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue(resolverInput);
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue(resolverInput));
            const defaultAssociations = {
                user: isArticleTokenuserFactory(defaultData.user) ? {
                    create: await defaultData.user.build()
                } : defaultData.user
            } as Prisma.ArticleTokenCreateInput;
            const data: Prisma.ArticleTokenCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...filteredInputData };
            await handleAfterBuild(data, transientFields);
            return data;
        };
        const buildList = (...args: unknown[]) => Promise.all(normalizeList<Partial<Prisma.ArticleTokenCreateInput & TTransients>>(...args).map(data => build(data)));
        const pickForConnect = (inputData: ArticleToken) => ({
            provider: inputData.provider,
            userId: inputData.userId
        });
        const create = async (inputData: Partial<Prisma.ArticleTokenCreateInput & TTransients> = {}) => {
            const data = await build({ ...inputData }).then(screen);
            const [transientFields] = destructure(defaultTransientFieldValues, inputData);
            await handleBeforeCreate(data, transientFields);
            const createdData = await getClient<PrismaClient>().articleToken.create({ data });
            await handleAfterCreate(createdData, transientFields);
            return createdData;
        };
        const createList = (...args: unknown[]) => Promise.all(normalizeList<Partial<Prisma.ArticleTokenCreateInput & TTransients>>(...args).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.ArticleTokenCreateInput & TTransients> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "ArticleToken" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: ArticleTokenTraitKeys<TOptions>, ...names: readonly ArticleTokenTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

interface ArticleTokenFactoryBuilder {
    <TOptions extends ArticleTokenFactoryDefineOptions>(options: TOptions): ArticleTokenFactoryInterface<{}, ArticleTokenTraitKeys<TOptions>>;
    withTransientFields: <TTransients extends ArticleTokenTransientFields>(defaultTransientFieldValues: TTransients) => <TOptions extends ArticleTokenFactoryDefineOptions<TTransients>>(options: TOptions) => ArticleTokenFactoryInterface<TTransients, ArticleTokenTraitKeys<TOptions>>;
}

/**
 * Define factory for {@link ArticleToken} model.
 *
 * @param options
 * @returns factory {@link ArticleTokenFactoryInterface}
 */
export const defineArticleTokenFactory = (<TOptions extends ArticleTokenFactoryDefineOptions>(options: TOptions): ArticleTokenFactoryInterface<TOptions> => {
    return defineArticleTokenFactoryInternal(options, {});
}) as ArticleTokenFactoryBuilder;

defineArticleTokenFactory.withTransientFields = defaultTransientFieldValues => options => defineArticleTokenFactoryInternal(options, defaultTransientFieldValues);

type UserScalarOrEnumFields = {};

type UserFactoryDefineInput = {
    id?: string;
    name?: string | null;
    email?: string | null;
    emailVerified?: Date | null;
    image?: string | null;
    location?: string | null;
    organization?: string | null;
    bio?: string | null;
    accounts?: Prisma.AccountCreateNestedManyWithoutUserInput;
    apiTokens?: Prisma.ArticleTokenCreateNestedManyWithoutUserInput;
    sessions?: Prisma.SessionCreateNestedManyWithoutUserInput;
    skills?: Prisma.SkillCreateNestedManyWithoutUserInput;
    tags?: Prisma.TagCreateNestedManyWithoutUserInput;
    works?: Prisma.WorkCreateNestedManyWithoutUserInput;
};

type UserTransientFields = Record<string, unknown> & Partial<Record<keyof UserFactoryDefineInput, never>>;

type UserFactoryTrait<TTransients extends Record<string, unknown>> = {
    data?: Resolver<Partial<UserFactoryDefineInput>, BuildDataOptions<TTransients>>;
} & CallbackDefineOptions<User, Prisma.UserCreateInput, TTransients>;

type UserFactoryDefineOptions<TTransients extends Record<string, unknown> = Record<string, unknown>> = {
    defaultData?: Resolver<UserFactoryDefineInput, BuildDataOptions<TTransients>>;
    traits?: {
        [traitName: TraitName]: UserFactoryTrait<TTransients>;
    };
} & CallbackDefineOptions<User, Prisma.UserCreateInput, TTransients>;

type UserTraitKeys<TOptions extends UserFactoryDefineOptions<any>> = Exclude<keyof TOptions["traits"], number>;

export interface UserFactoryInterfaceWithoutTraits<TTransients extends Record<string, unknown>> {
    readonly _factoryFor: "User";
    build(inputData?: Partial<Prisma.UserCreateInput & TTransients>): PromiseLike<Prisma.UserCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.UserCreateInput & TTransients>): PromiseLike<Prisma.UserCreateInput>;
    buildList(list: readonly Partial<Prisma.UserCreateInput & TTransients>[]): PromiseLike<Prisma.UserCreateInput[]>;
    buildList(count: number, item?: Partial<Prisma.UserCreateInput & TTransients>): PromiseLike<Prisma.UserCreateInput[]>;
    pickForConnect(inputData: User): Pick<User, "id">;
    create(inputData?: Partial<Prisma.UserCreateInput & TTransients>): PromiseLike<User>;
    createList(list: readonly Partial<Prisma.UserCreateInput & TTransients>[]): PromiseLike<User[]>;
    createList(count: number, item?: Partial<Prisma.UserCreateInput & TTransients>): PromiseLike<User[]>;
    createForConnect(inputData?: Partial<Prisma.UserCreateInput & TTransients>): PromiseLike<Pick<User, "id">>;
}

export interface UserFactoryInterface<TTransients extends Record<string, unknown> = Record<string, unknown>, TTraitName extends TraitName = TraitName> extends UserFactoryInterfaceWithoutTraits<TTransients> {
    use(name: TTraitName, ...names: readonly TTraitName[]): UserFactoryInterfaceWithoutTraits<TTransients>;
}

function autoGenerateUserScalarsOrEnums({ seq }: {
    readonly seq: number;
}): UserScalarOrEnumFields {
    return {};
}

function defineUserFactoryInternal<TTransients extends Record<string, unknown>, TOptions extends UserFactoryDefineOptions<TTransients>>({ defaultData: defaultDataResolver, onAfterBuild, onBeforeCreate, onAfterCreate, traits: traitsDefs = {} }: TOptions, defaultTransientFieldValues: TTransients): UserFactoryInterface<TTransients, UserTraitKeys<TOptions>> {
    const getFactoryWithTraits = (traitKeys: readonly UserTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("User", modelFieldDefinitions);
        const handleAfterBuild = createCallbackChain([
            onAfterBuild,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterBuild),
        ]);
        const handleBeforeCreate = createCallbackChain([
            ...traitKeys.slice().reverse().map(traitKey => traitsDefs[traitKey]?.onBeforeCreate),
            onBeforeCreate,
        ]);
        const handleAfterCreate = createCallbackChain([
            onAfterCreate,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterCreate),
        ]);
        const build = async (inputData: Partial<Prisma.UserCreateInput & TTransients> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateUserScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<UserFactoryDefineInput, BuildDataOptions<any>>(defaultDataResolver ?? {});
            const [transientFields, filteredInputData] = destructure(defaultTransientFieldValues, inputData);
            const resolverInput = { seq, ...transientFields };
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<UserFactoryDefineInput>, BuildDataOptions<TTransients>>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue(resolverInput);
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue(resolverInput));
            const defaultAssociations = {} as Prisma.UserCreateInput;
            const data: Prisma.UserCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...filteredInputData };
            await handleAfterBuild(data, transientFields);
            return data;
        };
        const buildList = (...args: unknown[]) => Promise.all(normalizeList<Partial<Prisma.UserCreateInput & TTransients>>(...args).map(data => build(data)));
        const pickForConnect = (inputData: User) => ({
            id: inputData.id
        });
        const create = async (inputData: Partial<Prisma.UserCreateInput & TTransients> = {}) => {
            const data = await build({ ...inputData }).then(screen);
            const [transientFields] = destructure(defaultTransientFieldValues, inputData);
            await handleBeforeCreate(data, transientFields);
            const createdData = await getClient<PrismaClient>().user.create({ data });
            await handleAfterCreate(createdData, transientFields);
            return createdData;
        };
        const createList = (...args: unknown[]) => Promise.all(normalizeList<Partial<Prisma.UserCreateInput & TTransients>>(...args).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.UserCreateInput & TTransients> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "User" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: UserTraitKeys<TOptions>, ...names: readonly UserTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

interface UserFactoryBuilder {
    <TOptions extends UserFactoryDefineOptions>(options?: TOptions): UserFactoryInterface<{}, UserTraitKeys<TOptions>>;
    withTransientFields: <TTransients extends UserTransientFields>(defaultTransientFieldValues: TTransients) => <TOptions extends UserFactoryDefineOptions<TTransients>>(options?: TOptions) => UserFactoryInterface<TTransients, UserTraitKeys<TOptions>>;
}

/**
 * Define factory for {@link User} model.
 *
 * @param options
 * @returns factory {@link UserFactoryInterface}
 */
export const defineUserFactory = (<TOptions extends UserFactoryDefineOptions>(options?: TOptions): UserFactoryInterface<TOptions> => {
    return defineUserFactoryInternal(options ?? {}, {});
}) as UserFactoryBuilder;

defineUserFactory.withTransientFields = defaultTransientFieldValues => options => defineUserFactoryInternal(options ?? {}, defaultTransientFieldValues);

type VerificationTokenScalarOrEnumFields = {
    identifier: string;
    token: string;
    expires: Date;
};

type VerificationTokenFactoryDefineInput = {
    identifier?: string;
    token?: string;
    expires?: Date;
};

type VerificationTokenTransientFields = Record<string, unknown> & Partial<Record<keyof VerificationTokenFactoryDefineInput, never>>;

type VerificationTokenFactoryTrait<TTransients extends Record<string, unknown>> = {
    data?: Resolver<Partial<VerificationTokenFactoryDefineInput>, BuildDataOptions<TTransients>>;
} & CallbackDefineOptions<VerificationToken, Prisma.VerificationTokenCreateInput, TTransients>;

type VerificationTokenFactoryDefineOptions<TTransients extends Record<string, unknown> = Record<string, unknown>> = {
    defaultData?: Resolver<VerificationTokenFactoryDefineInput, BuildDataOptions<TTransients>>;
    traits?: {
        [traitName: TraitName]: VerificationTokenFactoryTrait<TTransients>;
    };
} & CallbackDefineOptions<VerificationToken, Prisma.VerificationTokenCreateInput, TTransients>;

type VerificationTokenTraitKeys<TOptions extends VerificationTokenFactoryDefineOptions<any>> = Exclude<keyof TOptions["traits"], number>;

export interface VerificationTokenFactoryInterfaceWithoutTraits<TTransients extends Record<string, unknown>> {
    readonly _factoryFor: "VerificationToken";
    build(inputData?: Partial<Prisma.VerificationTokenCreateInput & TTransients>): PromiseLike<Prisma.VerificationTokenCreateInput>;
    buildCreateInput(inputData?: Partial<Prisma.VerificationTokenCreateInput & TTransients>): PromiseLike<Prisma.VerificationTokenCreateInput>;
    buildList(list: readonly Partial<Prisma.VerificationTokenCreateInput & TTransients>[]): PromiseLike<Prisma.VerificationTokenCreateInput[]>;
    buildList(count: number, item?: Partial<Prisma.VerificationTokenCreateInput & TTransients>): PromiseLike<Prisma.VerificationTokenCreateInput[]>;
    pickForConnect(inputData: VerificationToken): Pick<VerificationToken, "token">;
    create(inputData?: Partial<Prisma.VerificationTokenCreateInput & TTransients>): PromiseLike<VerificationToken>;
    createList(list: readonly Partial<Prisma.VerificationTokenCreateInput & TTransients>[]): PromiseLike<VerificationToken[]>;
    createList(count: number, item?: Partial<Prisma.VerificationTokenCreateInput & TTransients>): PromiseLike<VerificationToken[]>;
    createForConnect(inputData?: Partial<Prisma.VerificationTokenCreateInput & TTransients>): PromiseLike<Pick<VerificationToken, "token">>;
}

export interface VerificationTokenFactoryInterface<TTransients extends Record<string, unknown> = Record<string, unknown>, TTraitName extends TraitName = TraitName> extends VerificationTokenFactoryInterfaceWithoutTraits<TTransients> {
    use(name: TTraitName, ...names: readonly TTraitName[]): VerificationTokenFactoryInterfaceWithoutTraits<TTransients>;
}

function autoGenerateVerificationTokenScalarsOrEnums({ seq }: {
    readonly seq: number;
}): VerificationTokenScalarOrEnumFields {
    return {
        identifier: getScalarFieldValueGenerator().String({ modelName: "VerificationToken", fieldName: "identifier", isId: false, isUnique: true, seq }),
        token: getScalarFieldValueGenerator().String({ modelName: "VerificationToken", fieldName: "token", isId: false, isUnique: true, seq }),
        expires: getScalarFieldValueGenerator().DateTime({ modelName: "VerificationToken", fieldName: "expires", isId: false, isUnique: false, seq })
    };
}

function defineVerificationTokenFactoryInternal<TTransients extends Record<string, unknown>, TOptions extends VerificationTokenFactoryDefineOptions<TTransients>>({ defaultData: defaultDataResolver, onAfterBuild, onBeforeCreate, onAfterCreate, traits: traitsDefs = {} }: TOptions, defaultTransientFieldValues: TTransients): VerificationTokenFactoryInterface<TTransients, VerificationTokenTraitKeys<TOptions>> {
    const getFactoryWithTraits = (traitKeys: readonly VerificationTokenTraitKeys<TOptions>[] = []) => {
        const seqKey = {};
        const getSeq = () => getSequenceCounter(seqKey);
        const screen = createScreener("VerificationToken", modelFieldDefinitions);
        const handleAfterBuild = createCallbackChain([
            onAfterBuild,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterBuild),
        ]);
        const handleBeforeCreate = createCallbackChain([
            ...traitKeys.slice().reverse().map(traitKey => traitsDefs[traitKey]?.onBeforeCreate),
            onBeforeCreate,
        ]);
        const handleAfterCreate = createCallbackChain([
            onAfterCreate,
            ...traitKeys.map(traitKey => traitsDefs[traitKey]?.onAfterCreate),
        ]);
        const build = async (inputData: Partial<Prisma.VerificationTokenCreateInput & TTransients> = {}) => {
            const seq = getSeq();
            const requiredScalarData = autoGenerateVerificationTokenScalarsOrEnums({ seq });
            const resolveValue = normalizeResolver<VerificationTokenFactoryDefineInput, BuildDataOptions<any>>(defaultDataResolver ?? {});
            const [transientFields, filteredInputData] = destructure(defaultTransientFieldValues, inputData);
            const resolverInput = { seq, ...transientFields };
            const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
                const acc = await queue;
                const resolveTraitValue = normalizeResolver<Partial<VerificationTokenFactoryDefineInput>, BuildDataOptions<TTransients>>(traitsDefs[traitKey]?.data ?? {});
                const traitData = await resolveTraitValue(resolverInput);
                return {
                    ...acc,
                    ...traitData,
                };
            }, resolveValue(resolverInput));
            const defaultAssociations = {} as Prisma.VerificationTokenCreateInput;
            const data: Prisma.VerificationTokenCreateInput = { ...requiredScalarData, ...defaultData, ...defaultAssociations, ...filteredInputData };
            await handleAfterBuild(data, transientFields);
            return data;
        };
        const buildList = (...args: unknown[]) => Promise.all(normalizeList<Partial<Prisma.VerificationTokenCreateInput & TTransients>>(...args).map(data => build(data)));
        const pickForConnect = (inputData: VerificationToken) => ({
            token: inputData.token
        });
        const create = async (inputData: Partial<Prisma.VerificationTokenCreateInput & TTransients> = {}) => {
            const data = await build({ ...inputData }).then(screen);
            const [transientFields] = destructure(defaultTransientFieldValues, inputData);
            await handleBeforeCreate(data, transientFields);
            const createdData = await getClient<PrismaClient>().verificationToken.create({ data });
            await handleAfterCreate(createdData, transientFields);
            return createdData;
        };
        const createList = (...args: unknown[]) => Promise.all(normalizeList<Partial<Prisma.VerificationTokenCreateInput & TTransients>>(...args).map(data => create(data)));
        const createForConnect = (inputData: Partial<Prisma.VerificationTokenCreateInput & TTransients> = {}) => create(inputData).then(pickForConnect);
        return {
            _factoryFor: "VerificationToken" as const,
            build,
            buildList,
            buildCreateInput: build,
            pickForConnect,
            create,
            createList,
            createForConnect,
        };
    };
    const factory = getFactoryWithTraits();
    const useTraits = (name: VerificationTokenTraitKeys<TOptions>, ...names: readonly VerificationTokenTraitKeys<TOptions>[]) => {
        return getFactoryWithTraits([name, ...names]);
    };
    return {
        ...factory,
        use: useTraits,
    };
}

interface VerificationTokenFactoryBuilder {
    <TOptions extends VerificationTokenFactoryDefineOptions>(options?: TOptions): VerificationTokenFactoryInterface<{}, VerificationTokenTraitKeys<TOptions>>;
    withTransientFields: <TTransients extends VerificationTokenTransientFields>(defaultTransientFieldValues: TTransients) => <TOptions extends VerificationTokenFactoryDefineOptions<TTransients>>(options?: TOptions) => VerificationTokenFactoryInterface<TTransients, VerificationTokenTraitKeys<TOptions>>;
}

/**
 * Define factory for {@link VerificationToken} model.
 *
 * @param options
 * @returns factory {@link VerificationTokenFactoryInterface}
 */
export const defineVerificationTokenFactory = (<TOptions extends VerificationTokenFactoryDefineOptions>(options?: TOptions): VerificationTokenFactoryInterface<TOptions> => {
    return defineVerificationTokenFactoryInternal(options ?? {}, {});
}) as VerificationTokenFactoryBuilder;

defineVerificationTokenFactory.withTransientFields = defaultTransientFieldValues => options => defineVerificationTokenFactoryInternal(options ?? {}, defaultTransientFieldValues);
