import { notFound } from 'next/navigation'

import { getSession } from '@/lib/auth'
import { getSkillsWithTagsByUserId } from '@/repository/skill'
import { getTagsByUserId } from '@/repository/tag'

import { TopContent } from '../_components/TopContent'
import { SkillsTable } from './_components/SkillsTable'

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const session = await getSession()
  if (!session || !session.user?.id) return notFound()

  const skills = await getSkillsWithTagsByUserId(session.user.id)
  const tags = await getTagsByUserId(session.user.id)
  const action =
    typeof searchParams.action === 'string' ? searchParams.action : undefined

  return (
    <>
      <TopContent userId={session.user.id} />
      <SkillsTable
        skills={skills}
        tags={tags}
        userId={session.user.id}
        action={action}
      />
    </>
  )
}
