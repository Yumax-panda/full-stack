import { useState, useEffect, type FormEventHandler } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm, type UseFormReturn } from 'react-hook-form'

import { useToastPromise } from '@/app/_components/hooks/useToastPromise'
import { generateRandomColor } from '@/lib/color'
import { createTagSchema, type CreateTag } from '@/models'

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
    const apiUrl = '/api/tags'
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

  useEffect(() => {
    setValue('color', generateRandomColor())
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

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
