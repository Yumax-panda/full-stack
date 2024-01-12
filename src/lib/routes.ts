export const routes = {
  top: () => '/',
  userSkill: (userId: string) => `/users/${userId}`,
  userSkillEdit: () => `/settings/skills`,
  userArticle: (userId: string) => `/users/${userId}/articles`,
  userWork: (userId: string) => `/users/${userId}/works`,
  workDetail: (workId: string) => `/works/${workId}`,
  createNewWork: (workId: string) => `/works/${workId}/edit`,
} as const
