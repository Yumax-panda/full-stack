import { SkillSection } from './_components/SkillSection'
import { getSkillsWithTagsByUserId } from '@/repository/skill'

export default async function Page({ userId }: { userId: string }) {
  const skills = await getSkillsWithTagsByUserId(userId)

  return <SkillSection skills={skills} />
}
