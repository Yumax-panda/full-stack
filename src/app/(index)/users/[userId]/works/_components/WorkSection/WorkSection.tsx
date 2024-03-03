'use client'

import { Grid } from '@mui/material'
import { useAtom } from 'jotai'
import { useHydrateAtoms } from 'jotai/utils'

import { WorkCard } from '../WorkCard'

import type { PartialWork } from '@/repository/work'

import { partialWorksAtom } from '@/store/partialWorksAtom'

type Props = {
  works: PartialWork[]
}

export const WorkSection = ({ works: worksFromServer }: Props) => {
  // ref: https://jotai.org/docs/utilities/ssr
  useHydrateAtoms([[partialWorksAtom, worksFromServer]])
  const [hydratedWorks] = useAtom(partialWorksAtom)

  return (
    <Grid container spacing={2}>
      {hydratedWorks.map((work) => (
        <Grid key={work.id} item xs={12} sm={6} md={4}>
          <WorkCard {...work} />
        </Grid>
      ))}
    </Grid>
  )
}
