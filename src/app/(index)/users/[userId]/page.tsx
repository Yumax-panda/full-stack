import { getSkillsWithTagsByUserId } from '@/repository/skill'

import { SkillSection } from './_components/SkillSection'

export default async function Page({
  params: { userId },
}: {
  params: { userId: string }
}) {
  const skills = await getSkillsWithTagsByUserId(userId)

  return <SkillSection skills={skills} />
}
