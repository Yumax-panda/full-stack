'use client'

import { Grid } from '@mui/material'

import { useSkillSection } from '../hooks/useSkillSection'
import { SkillCard } from '../SkillCard'

import type { Props as SkillCardProps } from '../SkillCard'

import { Tag } from '@/app/(index)/_components/Tag'

type Props = {
  skills: SkillCardProps[]
}

export const SkillSection = ({ skills: initial }: Props) => {
  const { skills, selectedTags, onTagRemoved } = useSkillSection({
    skills: initial,
  })

  return (
    <div>
      <Grid container spacing={2} sx={{ display: 'flex' }}>
        {selectedTags.map((tag) => (
          <Grid item key={tag.id}>
            <Tag {...tag} onDelete={onTagRemoved(tag.id)} />
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2} sx={{ display: 'flex' }}>
        {skills.map((skill) => (
          <Grid item xs={12} md={4} key={skill.name}>
            <SkillCard {...skill} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}
