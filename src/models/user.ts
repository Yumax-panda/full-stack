import { z } from 'zod'

export enum UpdateUserSchemaErrors {
  NAME_REQUIRED = 'name is required.',
  TOO_LONG_NAME = 'name is up to 30 characters.',
  TOO_LONG_LOCATION = 'location is up to 100 characters.',
  TOO_LONG_ORGANIZATION = 'organization is up to 100 characters.',
  TOO_LONG_BIO = 'bio is up to 100 characters.',
}

export const updateUserSchema = z.object({
  name: z
    .string()
    .min(1, UpdateUserSchemaErrors.NAME_REQUIRED)
    .max(30, UpdateUserSchemaErrors.TOO_LONG_NAME)
    .transform((v) => v.trim()),
  location: z
    .string()
    .max(100, UpdateUserSchemaErrors.TOO_LONG_LOCATION)
    .nullable(),
  organization: z
    .string()
    .max(100, UpdateUserSchemaErrors.TOO_LONG_ORGANIZATION)
    .nullable(),
  bio: z.string().max(100, UpdateUserSchemaErrors.TOO_LONG_BIO).nullable(),
})

export type UpdateUserProps = z.infer<typeof updateUserSchema> & { id: string }
