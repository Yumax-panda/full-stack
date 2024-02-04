import { useForm, useFieldArray, type UseFormReturn } from 'react-hook-form'
import { useState, type FormEventHandler } from 'react'
import { useRouter } from 'next/navigation'
import { createSkillSchema, type CreateSkillProps } from '@/models'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToastPromise } from '@/app/_components/hooks/useToastPromise'

type Props = {
  onClose: () => void
}

type FormValues = CreateSkillProps

type UseCreateSkillFormReturn = Pick<
  UseFormReturn<FormValues>,
  'register' | 'formState' | 'setValue'
> & {
  handleSubmit: FormEventHandler<HTMLFormElement>
  isLoading: boolean
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
    control,
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      level: 0,
      image: null,
      tags: [],
    },
    resolver: zodResolver(createSkillSchema),
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { task } = useToastPromise({
    pending: 'スキルを新規作成中...',
    success: 'スキルを作成しました',
    action: async (data: FormValues) => {
      await createSkill(data)
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

  return {
    register,
    handleSubmit: defaultHandleSubmit(task),
    formState,
    setValue,
    isLoading,
  }
}
