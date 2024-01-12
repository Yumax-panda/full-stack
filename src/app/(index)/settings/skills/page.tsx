import { notFound } from 'next/navigation'

import { getSession } from '@/lib/auth'
import { getSkillsWithTagsByUserId } from '@/repository/skill'

import { SkillsTable } from './_components/SkillsTable'

export default async function Page() {
  const session = await getSession()
  if (!session || !session.user?.id) return notFound()

  const skills = await getSkillsWithTagsByUserId(session.user.id)

  return <SkillsTable skills={skills} />
}
