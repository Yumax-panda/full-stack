import { notFound } from 'next/navigation'

import { getSession } from '@/lib/auth'
import { getWorkById } from '@/repository/work'
import { Box } from '@mui/material'

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
      {isMyWork && (
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'flex-end',
            my: '0.5rem',
          }}
        >
          <EditButton workId={workId} />
        </Box>
      )}
      <Content {...work} />
    </>
  )
}
