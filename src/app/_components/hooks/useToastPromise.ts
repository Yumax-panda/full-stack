import { toast } from 'react-toastify'
import { message } from '@/lib/message'
import type { Dispatch, SetStateAction } from 'react'

type Props<T> = {
  pending: string
  success: string
  action: (data: T) => Promise<void>
  setIsLoading: Dispatch<SetStateAction<boolean>>
}

type UseToastPromiseReturn<T> = {
  task: (data: T) => Promise<void>
}

export const useToastPromise = <T>({
  pending,
  success,
  action,
  setIsLoading,
}: Props<T>): UseToastPromiseReturn<T> => {
  const task = async (data: T) =>
    toast
      .promise(
        async () => {
          setIsLoading(true)
          try {
            await action(data)
          } finally {
            setIsLoading(false)
          }
        },
        {
          pending,
          success,
          error: {
            render: ({ data }) => {
              if (data instanceof Error) {
                return data.message
              }
              console.error('failed to create tag', data)
              return message.unknown
            },
          },
        },
      )
      .catch(() => {})

  return { task }
}
