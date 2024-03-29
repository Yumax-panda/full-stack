import { Box } from '@mui/material'
import { notFound } from 'next/navigation'

import { TopContent } from '../_components/TopContent'

import { TagTable } from './_components/TagTable'

import type { Metadata } from 'next'

import { Breadcrumbs } from '@/app/_components/Breadcrumbs'
import { getSession } from '@/lib/auth'
import { env } from '@/lib/env.mjs'
import { routes } from '@/lib/routes'
import { getTagsByUserId } from '@/repository/tag'

export const metadata: Metadata = {
  title: 'タグを編集',
  metadataBase: new URL(env.NEXTAUTH_URL),
  openGraph: {
    title: 'タグを編集',
  },
}

export default async function Page() {
  const session = await getSession()
  if (!session || !session.user?.id) return notFound()

  const tags = await getTagsByUserId(session.user.id)

  return (
    <>
      <TopContent userId={session.user.id} />
      <Box sx={{ my: '1.5rem' }}>
        <Breadcrumbs
          links={[
            {
              href: routes.userSkill(session.user.id),
              label: session.user.name || '無名',
            },
            { href: routes.tag(), label: 'タグを編集' },
          ]}
        />
      </Box>
      <TagTable tags={tags} />
    </>
  )
}
