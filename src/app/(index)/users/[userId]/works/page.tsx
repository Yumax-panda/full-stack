import { BusinessCenterOutlined } from '@mui/icons-material'
import { getSession } from '@/lib/auth'
import {
  getAllPartialWorksByUserId,
  getPublicPartialWorksByUserId,
} from '@/repository/work'

import { Empty } from '../_components/Empty'
import { WorkAddButton } from './_components/WorkAddButton'
import { WorkSection } from './_components/WorkSection'

export default async function Work({
  params: { userId },
}: {
  params: { userId: string }
}) {
  const session = await getSession()
  const fetcher =
    session?.user?.id === userId
      ? getAllPartialWorksByUserId
      : getPublicPartialWorksByUserId
  const works = await fetcher(userId)

  return (
    <>
      <WorkAddButton userId={userId} />
      {works.length === 0 ? (
        <Empty
          Icon={BusinessCenterOutlined}
          title='まだ作品が登録されていません'
        />
      ) : (
        <WorkSection works={works} />
      )}
    </>
  )
}
