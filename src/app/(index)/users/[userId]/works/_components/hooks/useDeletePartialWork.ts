import { atom } from 'jotai'
import { useCallback, useState } from 'react'
import { useToastPromise } from '@/app/_components/hooks/useToastPromise'

import { partialWorksAtom } from '@/store/partialWorksAtom'

type Props = {
  workId: string
}

type UseDeletePartialWorksReturn = {
  onDelete: () => void
  isLoading: boolean
}

export const useDeletePartialWork = ({
  workId,
}: Props): UseDeletePartialWorksReturn => {
  const [isLoading, setIsLoading] = useState(false)

  const deleteWorkAtom = () =>
    atom(null, (get, set) =>
      set(
        partialWorksAtom,
        get(partialWorksAtom).filter((work) => work.id !== workId),
      ),
    )

  const { task } = useToastPromise({
    pending: '制作物を削除中',
    success: '制作物を削除しました',
    action: async (_: any) => {
      const resp = await fetch(`/api/works/${workId}`, {
        method: 'DELETE',
      })
      if (!resp.ok) {
        throw new Error('制作物の削除に失敗しました')
      }
      deleteWorkAtom()
    },
    setIsLoading,
  })

  const onDelete = useCallback(() => task(null), [task])

  return {
    onDelete,
    isLoading,
  }
}
