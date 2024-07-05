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
    const res = await client.api.skills[':skillId'].$delete({
      param: { skillId },
    })
    if (!res.ok) {
      const data = await res.json()
      throw new Error(res.statusText)
    }
    router.refresh()
  }

  return { onDelete }
}
