import { WorkAddButton } from './_components/WorkAddButton'
import { WorkSection } from './_components/WorkSection'

import { getSession } from '@/lib/auth'
import {
  getAllPartialWorksByUserId,
  getPublicPartialWorksByUserId,
} from '@/repository/work'

export default async function Work({
  params: { userId },
}: {
  params: { userId: string }
}) {
  const session = await getSession()
  const isMine = session?.user?.id === userId
  const fetcher = isMine
    ? getAllPartialWorksByUserId
    : getPublicPartialWorksByUserId
  const works = await fetcher(userId)

  return (
    <>
      <WorkAddButton userId={userId} />
      <WorkSection works={works} isMine={isMine} />
    </>
  )
}
