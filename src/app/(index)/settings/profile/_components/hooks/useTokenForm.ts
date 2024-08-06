import { useToastPromise } from '@/app/_components/hooks/useToastPromise'
import { client } from '@/lib/client'
import { updateArticleTokenSchema } from '@/models/articleToken'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'

type Props = {
  qiita: string | null
  zenn: string | null
  note: string | null
}

type FormValues = {
  [K in keyof Props]: string
}

export const useTokenForm = ({ qiita, zenn, note }: Props) => {
  const router = useRouter()
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      qiita: qiita || '',
      zenn: zenn || '',
      note: note || '',
    },
    resolver: zodResolver(updateArticleTokenSchema),
  })

  const [isLoading, setIsLoading] = useState(false)

  const updateTokens: SubmitHandler<FormValues> = async (data) => {
    await client.api.v1.users['@me'].tokens.$patch({ json: data })
    router.refresh()
  }

  const { task: onSubmit } = useToastPromise({
    pending: 'APIキーを更新中...',
    success: 'APIキーを更新しました',
    action: updateTokens,
    setIsLoading,
  })

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    isLoading,
  }
}
