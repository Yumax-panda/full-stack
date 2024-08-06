import { useToastPromise } from '@/app/_components/hooks/useToastPromise'
import { client } from '@/lib/client'
import { updateUserSchema } from '@/models/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'

type FormValues = {
  name: string
  location: string
  organization: string
  bio: string
}

type Props = {
  [K in keyof FormValues]: string | null
}

export const useEditProfileForm = (props: Props) => {
  const { update } = useSession()
  const router = useRouter()
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      name: props.name || '',
      location: props.location || '',
      organization: props.organization || '',
      bio: props.bio || '',
    },
    resolver: zodResolver(updateUserSchema),
  })

  const [isLoading, setIsLoading] = useState(false)

  const updateProfile: SubmitHandler<FormValues> = async (data) => {
    const res = await client.api.v1.users['@me'].$patch({ json: data })
    // TODO: エラー処理
    update()
    router.refresh()
  }

  const { task: onSubmit } = useToastPromise({
    pending: 'プロフィールを更新中...',
    success: 'プロフィールを更新しました',
    action: updateProfile,
    setIsLoading,
  })

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    isLoading,
  }
}
