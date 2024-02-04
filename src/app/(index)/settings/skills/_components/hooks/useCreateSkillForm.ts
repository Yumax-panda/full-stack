import { useForm } from 'react-hook-form'
import type { UseFormReturn } from 'react-hook-form'
import { useState, type FormEventHandler } from 'react'
import { useRouter } from 'next/navigation'
import { createSkillSchema, type CreateSkillProps } from '@/models'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToastPromise } from '@/app/_components/hooks/useToastPromise'
import { getImage } from '@/constants/skills'

type Props = {
  onClose: () => void
}

type FormValues = Omit<CreateSkillProps, 'image'>

export type UseCreateSkillFormReturn = Pick<
  UseFormReturn<FormValues>,
  'register' | 'formState'
> & {
  handleSubmit: FormEventHandler<HTMLFormElement>
  isLoading: boolean
  handleChangeTagIds: (id: string | string[]) => void
  selectedTags: string[]
}

export const useCreateSkillForm = ({
  onClose,
}: Props): UseCreateSkillFormReturn => {
  const {
    register,
    handleSubmit: defaultHandleSubmit,
    formState,
    setValue,
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      level: 0,
      tags: [],
    },
    resolver: zodResolver(createSkillSchema),
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { task } = useToastPromise({
    pending: 'スキルを新規作成中...',
    success: 'スキルを作成しました',
    action: async (data: FormValues) => {
      await createSkill({
        ...data,
        image: getImage(data.name),
      })
      router.refresh()
      onClose()
    },
    setIsLoading,
  })

  const createSkill = async (data: CreateSkillProps) => {
    const apiUrl = '/api/skills'
    const res = await fetch(apiUrl, {
      method: 'POST',
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
