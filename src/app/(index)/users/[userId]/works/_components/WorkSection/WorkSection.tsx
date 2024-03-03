'use client'

import { Grid } from '@mui/material'
import { BusinessCenterOutlined } from '@mui/icons-material'

import { Empty } from '../../../_components/Empty'

import { WorkCard } from '../WorkCard'

import type { PartialWork } from '@/repository/work'
import { useState } from 'react'

type Props = {
  works: PartialWork[]
  // 自分のページの場合、詳細ボタンを表示する
  isMine: boolean
}

export const WorkSection = ({ works: worksFromServer, isMine }: Props) => {
  const [works, setWorks] = useState(worksFromServer)

  return works.length === 0 ? (
    <Empty Icon={BusinessCenterOutlined} title='制作物がありません' />
  ) : (
    <Grid container spacing={2}>
      {works.map((work) => (
        <Grid key={work.id} item xs={12} sm={6} md={4}>
          <WorkCard {...work} isMine={isMine} setWorks={setWorks} />
        </Grid>
      ))}
    </Grid>
  )
}
