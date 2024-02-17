import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { env } from '@/lib/env.mjs'
import { getSession } from '@/lib/auth'
import { getSkillsWithTagsByUserId } from '@/repository/skill'
import { getTagsByUserId } from '@/repository/tag'

import { TopContent } from '../_components/TopContent'
import { SkillsTable } from './_components/SkillsTable'

export const metadata: Metadata = {
  title: 'スキルを編集',
  metadataBase: new URL(env.NEXTAUTH_URL),
  openGraph: {
    title: 'スキルを編集',
  },
}

export default async function Page() {
  const session = await getSession()
  if (!session || !session.user?.id) return notFound()

  const skills = await getSkillsWithTagsByUserId(session.user.id)
  const tags = await getTagsByUserId(session.user.id)

  return (
    <>
      <TopContent userId={session.user.id} />
      <SkillsTable skills={skills} tags={tags} />
    </>
  )
}
