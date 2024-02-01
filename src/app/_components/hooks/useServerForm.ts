import { useFormState, useFormStatus, type FormStatus } from 'react-dom'

type Props<T> = {
  action: (state: T, formData: FormData) => Promise<T>
  initialState: T
}

type UseServerFormReturn<T> = {
  status: FormStatus
  formState: T
  dispatch: (payload: FormData) => void
}

export const useServerForm = <T>({
  action,
  initialState,
}: Props<T>): UseServerFormReturn<T> => {
  const [formState, dispatch] = useFormState(action, initialState)
  const status = useFormStatus()

  return { status, formState, dispatch }
}
