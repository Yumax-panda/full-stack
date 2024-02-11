import { BuildOutlined } from '@mui/icons-material'
import { getSkillsWithTagsByUserId } from '@/repository/skill'

import { AddSkillButton } from './_components/AddSkillButton'
import { SkillSection } from './_components/SkillSection'
import { Empty } from './_components/Empty'

export default async function Page({
  params: { userId },
}: {
  params: { userId: string }
}) {
  const skills = await getSkillsWithTagsByUserId(userId)

  return (
    <>
      <AddSkillButton userId={userId} />
      {skills.length === 0 ? (
        <Empty Icon={BuildOutlined} title='まだスキルが登録されていません' />
      ) : (
        <SkillSection skills={skills} />
      )}
    </>
  )
}
