import type { User, Skill, Tag } from '@/models'

type LoginProps = {
  email: string
  password: string
}

type CreateSkillProps = Omit<Skill, 'id' | 'userId'>
type UpdateSkillProps = Partial<CreateSkillProps> & Pick<Skill, 'id' | 'userId'>
type CreateTagProps = Omit<Tag, 'id'>
type UpdateTagProps = Partial<CreateTagProps> & Pick<Tag, 'id'>
type AddTagToSkillProps = {
  skillId: string
  tagId: string
}
type RemoveTagFromSkillProps = {
  skillId: string
  tagId: string
}

export type Client = {
  login({ email, password }: LoginProps): Promise<User>
  getSkills(): Promise<Skill[]>
  getSkill(id: string): Promise<Skill>
  createSkill(skill: CreateSkillProps): Promise<Skill>
  updateSkill(skill: UpdateSkillProps): Promise<Skill>
  deleteSkill(id: string): Promise<void>
  getTags(): Promise<Tag[]>
  getTag(id: string): Promise<Tag>
  createTag(tag: CreateTagProps): Promise<Tag>
  updateTag(tag: UpdateTagProps): Promise<Tag>
  deleteTag(id: string): Promise<void>
  addTagToSkill({ skillId, tagId }: AddTagToSkillProps): Promise<Skill>
  removeTagFromSkill({
    skillId,
    tagId,
  }: RemoveTagFromSkillProps): Promise<Skill>
}
