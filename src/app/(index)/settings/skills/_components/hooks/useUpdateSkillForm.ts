import { useForm } from 'react-hook-form'
import type { UseFormReturn } from 'react-hook-form'
import { useState, useCallback, type FormEventHandler } from 'react'
import { useRouter } from 'next/navigation'
import { createSkillSchema } from '@/models'
import type { CreateSkillProps } from '@/models'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToastPromise } from '@/app/_components/hooks/useToastPromise'
import { getImage } from '@/constants/skills'
import type { SkillWithTags } from '@/models'

type Props = {
  onClose: () => void
  skill: SkillWithTags
}

type FormValues = Omit<CreateSkillProps, 'image'>

export type UseUpdateSkillFormReturn = Pick<
  UseFormReturn<FormValues>,
  'register' | 'formState'
> & {
  handleSubmit: FormEventHandler<HTMLFormElement>
  isLoading: boolean
  handleChangeTagIds: (id: string | string[]) => void
  selectedTags: string[]
}

export const useUpdateSkillForm = ({
  onClose,
  skill,
}: Props): UseUpdateSkillFormReturn => {
  const {
    register,
    handleSubmit: defaultHandleSubmit,
    formState,
    setValue,
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      name: skill.name,
      level: skill.level,
      tags: skill.tags.map((tag) => tag.id),
    },
    resolver: zodResolver(createSkillSchema),
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { task } = useToastPromise({
    pending: 'スキルを更新中...',
    success: 'スキルを更新しました',
    action: async (data: FormValues) => {
      await updateSkill({
        ...data,
        image: getImage(data.name),
      })
      router.refresh()
      onClose()
    },
    setIsLoading,
  })

  const updateSkill = useCallback(
    async (data: CreateSkillProps) => {
      const apiUrl = `/api/skills/${skill.id}`
      const res = await fetch(apiUrl, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error)
      }
      return
    },
    [skill.id],
  )

  const handleChangeTagIds = (value: string | string[]) => {
    setValue('tags', typeof value === 'string' ? value.split(',') : value)
  }

  const selectedTags = watch('tags')

  return {
    register,
    handleSubmit: defaultHandleSubmit(task),
    formState,
    isLoading,
    handleChangeTagIds,
    selectedTags,
  }
}
