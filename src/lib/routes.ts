export const routes = {
  userSkill: (userId: string) => `/users/${userId}`,
  userArticle: (userId: string) => `/users/${userId}/articles`,
  userWork: (userId: string) => `/users/${userId}/works`,
} as const
