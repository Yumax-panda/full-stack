import type { Control, FormState } from 'react-hook-form'
import { useForm } from 'react-hook-form'

type FormValues = {
  title: string
  content: string
}

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
