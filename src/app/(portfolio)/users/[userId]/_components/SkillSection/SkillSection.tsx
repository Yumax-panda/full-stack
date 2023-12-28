import type { Props as SkillCardProps } from '../SkillCard'
import { Grid } from '@mui/material'

import { SkillCard } from '../SkillCard'

type Props = {
  skills: SkillCardProps[]
}

export const SkillSection = ({ skills }: Props) => (
  <Grid container spacing={2} sx={{ my: '1.5rem', display: 'flex' }}>
    {skills.map((skill) => (
      <Grid item xs={12} md={4} key={skill.name}>
        <SkillCard {...skill} />
      </Grid>
    ))}
  </Grid>
)