import { getPublicPartialWorksByUserId } from '@/repository/work'

import { WorkSection } from './_components/WorkSection'

export default async function Work({
  params: { userId },
}: {
  params: { userId: string }
}) {
  const works = await getPublicPartialWorksByUserId(userId)

  return <WorkSection works={works} />
}
