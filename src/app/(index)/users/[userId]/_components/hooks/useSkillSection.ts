import { useState } from 'react'

import type { Props as SkillCardProps } from '../SkillCard'

type Props = {
  skills: SkillCardProps[]
}

type Tag = SkillCardProps['tags'][0]

type UseSkillSectionReturn = {
  optionTags: Tag[]
  selectedTags: Tag[]
  filteredSkills: SkillCardProps[]
  setSelectedTags: (tags: Tag[]) => void
}

export const useSkillSection = ({
  skills: initial,
}: Props): UseSkillSectionReturn => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const tagMap: Record<string, Tag> = {}

  for (const skill of initial) {
    for (const tag of skill.tags) {
      tagMap[tag.id] = tag
    }
  }

  // タグが選択されている場合は、選択されたタグを持つスキルのみ表示する
  const filteredSkills = initial.filter((skill) => {
    if (selectedTags.length === 0) return true
    return selectedTags.every((tag) => skill.tags.some((t) => t.id === tag.id))
  })

  const optionTags = Object.values(tagMap)

  return { selectedTags, filteredSkills, setSelectedTags, optionTags }
}
