export const routes = {
  userSkill: (userId: string) => `/users/${userId}`,
  userArticle: (userId: string) => `/users/${userId}/articles`,
  userWork: (userId: string) => `/users/${userId}/works`,
  createNewWork: (workId: string) => `/works/${workId}/edit`,
  workDetails: (workId: string) => `/works/${workId}`,
} as const
