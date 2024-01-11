export const routes = {
  userSkill: (userId: string) => `/users/${userId}`,
  userArticle: (userId: string) => `/users/${userId}/articles`,
  userWork: (userId: string) => `/users/${userId}/works`,
  userWorkDetail: (userId: string, workId: string) =>
    `/users/${userId}/works/${workId}`,
  createNewWork: (workId: string) => `/works/${workId}/edit`,
} as const
