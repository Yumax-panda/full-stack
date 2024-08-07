import { useRouter } from 'next/navigation'

import { client } from '@/lib/client'

type Props = {
  skillId: string
}

type UseDeleteSkillReturn = {
  onDelete: () => Promise<void>
}

export const useDeleteSkill = ({ skillId }: Props): UseDeleteSkillReturn => {
  const router = useRouter()
  const onDelete = async () => {
    await client.api.v1.skills[':skillId'].$delete({
      param: { skillId },
    })
    router.refresh()
  }

  return { onDelete }
}
