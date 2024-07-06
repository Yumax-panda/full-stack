import { type FormEventHandler, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { type UseFormReturn, useForm } from 'react-hook-form'

import { useToastPromise } from '@/app/_components/hooks/useToastPromise'
import { client } from '@/lib/client'
import { generateRandomColor } from '@/lib/color'
import { DUPLICATED_NAME } from '@/lib/error'
import { type CreateTag, createTagSchema } from '@/models'

type Props = {
  onCanceled: () => void
  id: string
  name: string
  brief: string | null
  color: string
}

type FormValues = {
  name: string
  brief: string
  color: string
}

type UseUpdateTagFormReturn = Pick<
  UseFormReturn<FormValues>,
  'register' | 'formState' | 'setValue'
> & {
  handleSubmit: FormEventHandler<HTMLFormElement>
  isLoading: boolean
  current: FormValues
  regenerateColor: () => void
}

export const useUpdateTagForm = ({
  onCanceled,
  id: tagId,
  name,
  brief,
  color,
}: Props): UseUpdateTagFormReturn => {
  const {
    register,
    handleSubmit: defaultHandleSubmit,
    formState,
    setValue,
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      name,
      brief: brief || '',
      color,
    },
    resolver: zodResolver(createTagSchema),
  })
  const [isLoading, setIsLoading] = useState(false)
  const current = watch()
  const router = useRouter()
  const { task } = useToastPromise({
    pending: 'タグを編集中...',
    success: 'タグを更新しました',
    action: async (data: CreateTag) => {
      await updateTag(data)
      router.refresh()
      onCanceled()
    },
    setIsLoading,
  })

  const updateTag = async (data: CreateTag) => {
    const apiUrl = `/api/tags/${tagId}`
    const res = await client.api.tags[':tagId'].$patch({
      param: { tagId },
      json: data,
    })
    if (!res.ok) {
      const error = (await res.json()) as { error: string }
      switch (error.error) {
        case DUPLICATED_NAME:
          throw new Error(`タグ名「${data.name}」は既に存在しています.`)
        default:
          throw new Error('タグの更新に失敗しました.')
      }
    }
    return
  }

  const regenerateColor = () => {
    setValue('color', generateRandomColor())
  }

  return {
    register,
    handleSubmit: defaultHandleSubmit(task),
    formState,
    setValue,
    isLoading,
    current,
    regenerateColor,
  }
}
