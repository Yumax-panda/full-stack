import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { useToastPromise } from '@/app/_components/hooks/useToastPromise'
import { client } from '@/lib/client'

type Props = {
  workId: string
}

type UseDeletePartialWorksReturn = {
  onDelete: () => Promise<void>
  isLoading: boolean
}

export const useDeletePartialWork = ({
  workId,
}: Props): UseDeletePartialWorksReturn => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { task } = useToastPromise({
    pending: '制作物を削除中',
    success: '制作物を削除しました',
    action: async () => {
      const res = await client.api.works[':workId'].$delete({
        param: { workId },
      })
      if (!res.ok) {
        throw new Error('制作物の削除に失敗しました')
      }
      // HACK: 本当はdispatchを使って更新したいが、propsのバケツリレーを避けるためにリロードする
      router.refresh()
    },
    setIsLoading,
  })

  const onDelete = async () => {
    if (confirm('本当に制作物を削除しますか? この操作は取り消せません')) {
      await task(null)
    }
  }

  return {
    onDelete,
    isLoading,
  }
}
