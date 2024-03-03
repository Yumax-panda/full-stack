import { atom } from 'jotai'

import { partialWorksAtom } from '@/store/partialWorksAtom'

type Props = {
  workId: string
}

type UseDeletePartialWorksReturn = {
  onDelete: () => void
}

export const useDeletePartialWork = ({
  workId,
}: Props): UseDeletePartialWorksReturn => {
  const onDelete = () =>
    atom(null, (get, set) =>
      set(
        partialWorksAtom,
        get(partialWorksAtom).filter((work) => work.id !== workId),
      ),
    )

  return {
    onDelete,
  }
}
