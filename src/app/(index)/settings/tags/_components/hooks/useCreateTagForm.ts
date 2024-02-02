import { useForm, type UseFormReturn } from 'react-hook-form'
import { useState } from 'react'
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
  handleSubmit: () => void
  isLoading: boolean
}

export const useCreateTagForm = ({
  onCanceled,
}: Props): UseCreateTagFormReturn => {
  const { register, handleSubmit, formState, setValue } = useForm<FormValues>({
    defaultValues: {
      name: '',
      brief: '',
      color: generateRandomColor(),
    },
    resolver: zodResolver(createTagSchema),
  })
  const [isLoading, setIsLoading] = useState(false)

  const createTag = async (data: CreateTag) => {
    const apiUrl = '/api/tags'
    await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  }

  // TODO: Add error handling
  const onSubmit = async (data: CreateTag) => {
    setIsLoading(true)
    try {
      await createTag(data)
      onCanceled()
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    formState,
    setValue,
    isLoading,
  }
}
