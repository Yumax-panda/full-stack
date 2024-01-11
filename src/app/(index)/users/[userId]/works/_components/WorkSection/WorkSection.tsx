import type { PartialWork } from '@/repository/work'
import { Grid } from '@mui/material'

import { WorkCard } from '../WorkCard'

type Props = {
  works: PartialWork[]
}

export const WorkSection = ({ works }: Props) => (
  <Grid container spacing={1}>
    {works.map((work) => (
      <Grid key={work.id} item xs={12} md={4} sx={{ m: "auto" }} >
        <WorkCard {...work} />
      </Grid>
    ))}
  </Grid>
)
