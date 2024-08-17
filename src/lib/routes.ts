import { env } from '@/lib/env.mjs'

export const routes = {
  top: () => '/',
  userSkill: (userId: string) => `/users/${userId}`,
  userSkillEdit: () => '/settings/skills',
  tag: () => '/settings/tags',
  userArticle: (userId: string) => `/users/${userId}/articles`,
  userWork: (userId: string) => `/users/${userId}/works`,
  userProfileSettings: () => '/settings/profile',
  workDetail: (workId: string) => `/works/${workId}`,
  createNewWork: (workId: string) => `/works/${workId}/edit`,
} as const

export const tag = {
  skill: 'skill',
  tag: 'tag',
  article: 'article',
  work: 'work',
  private: 'private',
  public: 'public',
  partial: 'partial',
  token: 'token',
  profile: 'profile',
} as const

export const ogImagePaths = {
  base: (signature: string) => `${env.NEXTAUTH_URL}/api/v1/ogp/${signature}`,
} as const
