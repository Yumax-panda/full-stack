import { z } from 'zod'

const NAME_REQUIRED = 'name is required.'
const TOO_LONG_NAME = 'name is up to 30 characters.'
const TOO_LONG_LOCATION = 'location is up to 100 characters.'
const TOO_LONG_ORGANIZATION = 'organization is up to 100 characters.'
const TOO_LONG_BIO = 'bio is up to 100 characters.'

export const translateError = (message?: string): string | undefined => {
  if (!message) {
    return message
  }

  if (message.includes(NAME_REQUIRED)) {
    return '名前を入力してください.'
  }
  if (message.includes(TOO_LONG_NAME)) {
    return '名前は30文字以内で入力してください.'
  }
  if (message.includes(TOO_LONG_LOCATION)) {
    return '居住地は100文字以内で入力してください.'
  }
  if (message.includes(TOO_LONG_ORGANIZATION)) {
    return '所属は100文字以内で入力してください.'
  }
  if (message.includes(TOO_LONG_BIO)) {
    return '自己紹介は100文字以内で入力してください.'
  }
  return '予期しないエラーが発生しました.'
}

export const updateUserSchema = z.object({
  name: z
    .string()
    .min(1, NAME_REQUIRED)
    .max(30, TOO_LONG_NAME)
    .transform((v) => v.trim()),
  location: z
    .string()
    .max(100, TOO_LONG_LOCATION)
    .nullable()
    .transform((v) => (v?.trim() ? v.trim() : null)),
  organization: z
    .string()
    .max(100, TOO_LONG_ORGANIZATION)
    .nullable()
    .transform((v) => (v?.trim() ? v.trim() : null)),
  bio: z
    .string()
    .max(100, TOO_LONG_BIO)
    .nullable()
    .transform((v) => (v?.trim() ? v.trim() : null)),
})

export type UpdateUserProps = z.infer<typeof updateUserSchema> & { id: string }
