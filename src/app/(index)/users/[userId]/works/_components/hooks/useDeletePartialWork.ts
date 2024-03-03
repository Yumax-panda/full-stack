import { atom } from 'jotai'
import { useState } from 'react'
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
    success: '',
    action: async () => {
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

  const onDelete = () => {
    if (confirm('本当に制作物を削除しますか? この操作は取り消せません')) {
      task(null)
    }
  }

  return {
    onDelete,
    isLoading,
  }
}
