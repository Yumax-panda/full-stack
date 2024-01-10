import type { Control, FormState } from 'react-hook-form'
import { useForm } from 'react-hook-form'

import { updateWorkSchema as formSchema } from '@/models'
import { zodResolver } from '@hookform/resolvers/zod'

import type { Work as Props } from '@prisma/client'

import type { UpdateWork as FormValues } from '@/models'

type UseEditReturn = {
  control: Control<FormValues>
  onSubmit: () => void
  formState: FormState<FormValues>
}

export const useEdit = ({
  title,
  content,
  thumbnail,
  ...rest
}: Props): UseEditReturn => {
  const { control, handleSubmit, formState } = useForm<FormValues>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title ?? '',
      content: content ?? '',
      thumnail: thumbnail ?? '',
      ...rest,
    },
  })

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return {
    control,
    onSubmit,
    formState,
  }
}
