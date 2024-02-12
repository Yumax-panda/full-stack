import { useRouter } from 'next/navigation'

type Props = {
  skillId: string
}

type UseDeleteSkillReturn = {
  onDelete: () => Promise<void>
}

export const useDeleteSkill = ({ skillId }: Props): UseDeleteSkillReturn => {
  const router = useRouter()
  const onDelete = async () => {
    const res = await fetch(`/api/skills/${skillId}`, {
      method: 'DELETE',
    })
    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.error)
    }
    router.refresh()
  }

  return { onDelete }
}
