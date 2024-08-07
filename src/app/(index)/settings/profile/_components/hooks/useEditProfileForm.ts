import {
  ToastError,
  useToastPromise,
} from '@/app/_components/hooks/useToastPromise'
import { client } from '@/lib/client'
import { updateUserSchema } from '@/models/user'
import { translateError } from '@/models/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { type BaseSyntheticEvent, useState } from 'react'
import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import { useForm } from 'react-hook-form'

type FormValues = {
  name: string
  location: string
  organization: string
  bio: string
}

type UseEditProfileFormReturn = {
  register: UseFormRegister<FormValues>
  handleSubmit: (e?: BaseSyntheticEvent) => void
  isLoading: boolean
  errors: FieldErrors<FormValues>
}

type Props = {
  [K in keyof FormValues]: string | null
}

export const useEditProfileForm = ({
  name,
  location,
  organization,
  bio,
}: Props): UseEditProfileFormReturn => {
  const { update } = useSession()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    // ref: https://github.com/react-hook-form/react-hook-form/issues/8031
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: name || '',
      location: location || '',
      organization: organization || '',
      bio: bio || '',
    },
    resolver: zodResolver(updateUserSchema),
  })

  const [isLoading, setIsLoading] = useState(false)

  const { task: onSubmit } = useToastPromise({
    pending: 'プロフィールを更新中...',
    success: 'プロフィールを更新しました',
    action: async (data: FormValues) => {
      const res = await client.api.v1.users['@me'].$patch({ json: data })

      // FIXME: RPCでstatus codeが400のときの型が定義されていない
      if (res.status === 400) {
        const text = await res.text()
        const message = translateError(text)
        throw new ToastError(message)
      }
      await update()
      router.refresh()
    },
    setIsLoading,
  })

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    isLoading,
    errors,
  }
}
