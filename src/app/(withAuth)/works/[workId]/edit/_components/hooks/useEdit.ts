import type { Control, FormState } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
  title: z.string().min(1).trim(),
  content: z.string().min(1).trim(),
})

type FormValues = z.infer<typeof formSchema>

type UseEditReturn = {
  control: Control<FormValues>
  onSubmit: () => void
  formState: FormState<FormValues>
}

type Props = {
  title: string | null
  content: string | null
}

export const useEdit = ({ title, content }: Props): UseEditReturn => {
  const { control, handleSubmit, formState } = useForm<FormValues>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title ?? '',
      content: content ?? '',
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
