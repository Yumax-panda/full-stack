import { useForm, type UseFormReturn } from 'react-hook-form'
import { useState, useCallback, type FormEventHandler } from 'react'
import { useRouter } from 'next/navigation'
import { createTagSchema, type CreateTag } from '@/models'
import { zodResolver } from '@hookform/resolvers/zod'
import { generateRandomColor } from '@/lib/color'
import { useToastPromise } from '@/app/_components/hooks/useToastPromise'

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
  handleDelete: () => void
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

  const updateTag = useCallback(
    async (data: CreateTag) => {
      const apiUrl = `/api/tags/${tagId}`
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
    [tagId],
  )

  const regenerateColor = () => {
    setValue('color', generateRandomColor())
  }

  const handleDelete = async () => {
    confirm('本当に削除しますか？') && console.log('削除')
    router.refresh()
  }

  return {
    register,
    handleSubmit: defaultHandleSubmit(task),
    formState,
    setValue,
    isLoading,
    current,
    regenerateColor,
    handleDelete,
  }
}
