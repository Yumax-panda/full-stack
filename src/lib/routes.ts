export type EditActionType = 'new'

export const routes = {
  top: () => '/',
  userSkill: (userId: string) => `/users/${userId}`,
  userSkillEdit: (query?: EditActionType) => {
    if (!query) {
      return '/settings/skills'
    }
    const urls = ['/settings/skills']
    if (['edit', 'new'].includes(query)) {
      urls.push(`?action=${query}`)
    }
    return urls.join('')
  },
  userArticle: (userId: string) => `/users/${userId}/articles`,
  userWork: (userId: string) => `/users/${userId}/works`,
  userProfileSettings: () => '/settings/profile',
  workDetail: (workId: string) => `/works/${workId}`,
  createNewWork: (workId: string) => `/works/${workId}/edit`,
} as const

export const path: Record<keyof typeof routes, string> = {
  top: '/',
  userSkill: '(index)/users/[userId]',
  userSkillEdit: '(index)/settings/skills',
  userArticle: '(index)/users/[userId]/articles',
  userWork: '(index)/users/[userId]/works',
  userProfileSettings: '(index)/settings/profile',
  workDetail: '(index)/works/[workId]',
  createNewWork: '(withAuth)/works/[workId]/edit',
}
