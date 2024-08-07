import { type FormEventHandler, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import type { UseFormReturn } from 'react-hook-form'

import {
  ToastError,
  useToastPromise,
} from '@/app/_components/hooks/useToastPromise'
import { getImage } from '@/constants/skills'
import { client } from '@/lib/client'
import { DUPLICATED_NAME } from '@/lib/error'
import { type CreateSkillProps, createSkillSchema } from '@/models'

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
  value: FormValues
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
    const res = await client.api.v1.skills.$post({ json: data })
    if (!res.ok) {
      const error = (await res.json()) as { error: string }
      switch (error.error) {
        case DUPLICATED_NAME:
          throw new ToastError(`スキル名「${data.name}」は既に存在しています.`)
        default:
          throw new ToastError('スキルの作成に失敗しました.')
      }
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
