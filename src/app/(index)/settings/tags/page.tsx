import { getSession } from '@/lib/auth'
import { notFound } from 'next/navigation'
import { getTagsByUserId } from '@/repository/tag'
import { TagTable } from './_components/TagTable'
import { TopContent } from '../_components/TopContent'

export default async function Page() {
  const session = await getSession()
  if (!session || !session.user?.id) return notFound()

  const tags = await getTagsByUserId(session.user.id)

  return (
    <>
      <TopContent userId={session.user.id} />
      <TagTable tags={tags} />
    </>
  )
}
