import type { Dispatch, SetStateAction } from 'react'
import { toast } from 'react-toastify'

import { message } from '@/lib/message'

type Callback = (...args: any[]) => any

type Props<T extends Callback> = {
  pending: string
  success: string
  action: T
  setIsLoading: Dispatch<SetStateAction<boolean>>
}

type UseToastPromiseReturn<T extends Callback> = {
  task: (...data: Parameters<T>) => Promise<void>
}

// toast.promise内でエラーが発生し, ユーザーへエラーメッセージを表示するためのErrorクラス.
// `message`プロパティが表示される。
export class ToastError extends Error {}

export const useToastPromise = <T extends Callback>({
  pending,
  success,
  action,
  setIsLoading,
}: Props<T>): UseToastPromiseReturn<T> => {
  const task = async (...data: Parameters<T>) =>
    toast
      .promise(
        async () => {
          setIsLoading(true)
          try {
            await action(...data)
          } finally {
            setIsLoading(false)
          }
        },
        {
          pending,
          success,
          error: {
            // task実行時にErrorが発生した場合, そのエラーメッセージを表示する.
            render: ({ data }) => {
              if (data instanceof ToastError) {
                return data.message
              }
              if (process.env.NODE_ENV === 'development') {
                console.error('unexpected error:', data)
              }
              return message.unknown
            },
          },
        },
      )
      .catch(() => {})

  return { task }
}
