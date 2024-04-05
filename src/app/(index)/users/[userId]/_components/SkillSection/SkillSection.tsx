'use client'

import { Grid } from '@mui/material'

import { useSkillSection } from '../hooks/useSkillSection'
import { SkillCard } from '../SkillCard'
import { SkillTagFilterSelect } from '../SkillTagFilterSelect'

import type { Props as SkillCardProps } from '../SkillCard'

import { FadeIn } from '@/app/_components/FadeIn'

type Props = {
  skills: SkillCardProps[]
}

export const SkillSection = ({ skills: initial }: Props) => {
  const { selectedTags, filteredSkills, setSelectedTags, optionTags } =
    useSkillSection({
      skills: initial,
    })

  return (
    <div>
      {optionTags.length > 0 && (
        <SkillTagFilterSelect
          options={optionTags}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
      )}
      <FadeIn>
        <Grid container spacing={2} sx={{ display: 'flex' }}>
          {filteredSkills.map((skill) => (
            <Grid item xs={12} sm={6} md={4} key={skill.name}>
              <SkillCard {...skill} />
            </Grid>
          ))}
        </Grid>
      </FadeIn>
    </div>
  )
}
