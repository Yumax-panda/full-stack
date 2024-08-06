import { type FormEventHandler, useEffect, useState } from 'react'

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
}

type FormValues = {
  name: string
  brief: string
  color: string
}

type UseCreateTagFormReturn = Pick<
  UseFormReturn<FormValues>,
  'register' | 'formState' | 'setValue'
> & {
  handleSubmit: FormEventHandler<HTMLFormElement>
  isLoading: boolean
  current: FormValues
  regenerateColor: () => void
}

export const useCreateTagForm = ({
  onCanceled,
}: Props): UseCreateTagFormReturn => {
  const {
    register,
    handleSubmit: defaultHandleSubmit,
    formState,
    setValue,
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      brief: '',
      // NOTE: ここでランダムにするとサーバー生成の色と同じに(ほぼ)ならないためエラーが出る
      color: '',
    },
    resolver: zodResolver(createTagSchema),
  })
  const [isLoading, setIsLoading] = useState(false)
  const current = watch()
  const router = useRouter()
  const { task } = useToastPromise({
    pending: 'タグを作成中...',
    success: 'タグを作成しました',
    action: async (data: CreateTag) => {
      await createTag(data)
      router.refresh()
      onCanceled()
    },
    setIsLoading,
  })

  const createTag = async (data: CreateTag) => {
    const res = await client.api.v1.tags.$post({ json: data })
    if (!res.ok) {
      const error = (await res.json()) as { error: string }
      switch (error.error) {
        case DUPLICATED_NAME:
          throw new Error(`タグ名「${data.name}」は既に存在しています.`)
        default:
          throw new Error('タグの作成に失敗しました.')
      }
    }
    return
  }

  useEffect(() => {
    setValue('color', generateRandomColor())
  }, [setValue])

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
