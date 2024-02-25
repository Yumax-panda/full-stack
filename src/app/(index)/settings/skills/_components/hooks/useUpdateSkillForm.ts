import { useState, type FormEventHandler } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import type { CreateSkillProps, SkillWithTags } from '@/models'
import type { UseFormReturn } from 'react-hook-form'

import { useToastPromise } from '@/app/_components/hooks/useToastPromise'
import { getImage } from '@/constants/skills'
import { createSkillSchema } from '@/models'

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
  value: FormValues
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

  const updateSkill = async (data: CreateSkillProps) => {
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
  }

  const handleChangeTagIds = (value: string | string[]) => {
    setValue('tags', typeof value === 'string' ? value.split(',') : value)
  }

  const value = watch()

  return {
    register,
    handleSubmit: defaultHandleSubmit(task),
    formState,
    isLoading,
    handleChangeTagIds,
    value,
  }
}
