"use client"

import { Grid } from '@mui/material'

import { WorkCard } from '../WorkCard'
import { useWorksAtom } from '@/store/useWorksAtom'

import type { PartialWork } from '@/repository/work'

type Props = {
  works: PartialWork[]
}

export const WorkSection = ({ works: worksFromServer }: Props) => {
  const { works } = useWorksAtom({ worksFromServer })

  return (
    <Grid container spacing={2}>
      {works.map((work) => (
        <Grid key={work.id} item xs={12} sm={6} md={4}>
          <WorkCard {...work} />
        </Grid>
      ))}
    </Grid>
  )
}
