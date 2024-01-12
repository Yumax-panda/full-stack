import { getPublicPartialWorksByUserId } from '@/repository/work'

import { WorkAddButton } from './_components/WorkAddButton'
import { WorkSection } from './_components/WorkSection'

export default async function Work({
  params: { userId },
}: {
  params: { userId: string }
}) {
  const works = await getPublicPartialWorksByUserId(userId)

  return (
    <>
      <WorkAddButton userId={userId} />
      <WorkSection works={works} />
    </>
  )
}
