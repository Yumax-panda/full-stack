import { useForm, type UseFormReturn } from 'react-hook-form'
import { useState, useEffect, type FormEventHandler } from 'react'
import { useRouter } from 'next/navigation'
import { createTagSchema, type CreateTag } from '@/models'
import { zodResolver } from '@hookform/resolvers/zod'
import { generateRandomColor } from '@/lib/color'

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

  const createTag = async (data: CreateTag) => {
    const apiUrl = '/api/tags'
    return await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  }

  useEffect(() => {
    setValue('color', generateRandomColor())
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // TODO: Add error handling
  const onSubmit = async (data: CreateTag) => {
    setIsLoading(true)
    try {
      await createTag(data)
      onCanceled()
      router.refresh()
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const regenerateColor = () => {
    setValue('color', generateRandomColor())
  }

  const handleSubmit = defaultHandleSubmit(onSubmit)

  return {
    register,
    handleSubmit,
    formState,
    setValue,
    isLoading,
    current,
    regenerateColor,
  }
}
