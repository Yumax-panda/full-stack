import type { PartialWork } from '@/repository/work'
import { Grid } from '@mui/material'

import { WorkCard } from '../WorkCard'

type Props = {
  works: PartialWork[]
}

export const WorkSection = ({ works }: Props) => (
  <Grid container spacing={2}>
    {works.map((work) => (
      <Grid key={work.id} item xs={12} sm={6} md={4}>
        <WorkCard {...work} />
      </Grid>
    ))}
  </Grid>
)
