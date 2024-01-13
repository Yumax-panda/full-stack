import { get } from 'http'

import { getSession } from '@/lib/auth'
import {
  getAllPartialWorksByUserId,
  getPublicPartialWorksByUserId,
} from '@/repository/work'

import { WorkAddButton } from './_components/WorkAddButton'
import { WorkSection } from './_components/WorkSection'

export default async function Work({
  params: { userId },
}: {
  params: { userId: string }
}) {
  const session = await getSession()
  const fetcher = session
    ? getAllPartialWorksByUserId
    : getPublicPartialWorksByUserId
  const works = await fetcher(userId)

  return (
    <>
      <WorkAddButton userId={userId} />
      <WorkSection works={works} />
    </>
  )
}
