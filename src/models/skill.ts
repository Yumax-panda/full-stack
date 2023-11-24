import type { Id } from './common'

export type Level = 0 | 1 | 2 | 3
export type Category =
  | 'Language'
  | 'Framework'
  | 'Library'
  | 'Tool'
  | 'Infra'
  | 'Other'
export type Usage =
  | 'Frontend'
  | 'Backend'
  | 'Mobile'
  | 'Data Analysis'
  | 'Machine Learning'
  | 'DevOps'
  | 'Design'
  | 'Hobby'
  | 'Other'

export type SkillId = Id<number, 'Skill'>
export type Skill = {
  id: SkillId
  name: string
  category: Category
  usage: Usage
  level: Level
  description: string
  href: string
}
