import { getSkillsWithTagsByUserId } from '@/repository/skill'

import { AddSkillButton } from './_components/AddSkillButton'
import { SkillSection } from './_components/SkillSection'

export default async function Page({
  params: { userId },
}: {
  params: { userId: string }
}) {
  const skills = await getSkillsWithTagsByUserId(userId)

  return (
    <>
      <AddSkillButton userId={userId} />
      <SkillSection skills={skills} />
    </>
  )
}
