import { BuildOutlined } from '@mui/icons-material'

import { AddSkillButton } from './_components/AddSkillButton'
import { Empty } from './_components/Empty'
import { SkillSection } from './_components/SkillSection'

import { getSkillsWithTagsByUserId } from '@/repository/skill'

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
