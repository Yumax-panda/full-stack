import { useState } from 'react'

import type { Props as SkillCardProps } from '../SkillCard'

type Props = {
  skills: SkillCardProps[]
}

type Tag = SkillCardProps['tags'][0]

type UseSkillSectionReturn = {
  selectedTags: Tag[]
  skills: SkillCardProps[]
  onTagRemoved: (tagId: string) => () => void
}

export const useSkillSection = ({
  skills: initial,
}: Props): UseSkillSectionReturn => {
  const tagsMap: Record<string, Tag> = {}

  initial.forEach(({ tags }) => {
    tags.forEach((tag) => {
      tagsMap[tag.id] = tag
    })
  })

  const initialTagIds = Array.from(
    new Set(initial.flatMap(({ tags }) => tags.map(({ id }) => id))),
  )

  const [selectedTagIds, setSelectedTagIds] = useState<string[]>(initialTagIds)
  const selectedTags = selectedTagIds.map((id) => tagsMap[id])

  // タグが選択されていない場合は全てのスキルを表示
  const skills = initial.filter(({ tags }) =>
    tags.some(({ id }) => selectedTagIds.includes(id)),
  )

  const onTagRemoved = (tagId: string) => () => {
    setSelectedTagIds((prev) => {
      const next = prev.filter((id) => id !== tagId)
      return next.length === 0 ? initialTagIds : next
    })
  }

  return {
    selectedTags,
    onTagRemoved,
    skills,
  }
}
