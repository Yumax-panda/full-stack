import { notFound } from 'next/navigation'

import { getSession } from '@/lib/auth'
import { getWorkById } from '@/repository/work'
import { Box } from '@mui/material'

import { BackButton } from '../../_components/BackButton'
import { Content } from './_components/Content'
import { EditButton } from './_components/EditButton'

export default async function WorkDetailPage({
  params: { workId },
}: {
  params: {
    workId: string
  }
}) {
  const session = await getSession()
  const work = await getWorkById(workId)

  if (!work) {
    return notFound()
  }

  const isMyWork = session?.user?.id === work.userId

  if (work.isPrivate && !isMyWork) {
    return notFound()
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          my: '1rem',
        }}
      >
        <BackButton userId={work.userId} />
        {isMyWork && <EditButton workId={work.id} />}
      </Box>
      <Content {...work} />
    </>
  )
}
