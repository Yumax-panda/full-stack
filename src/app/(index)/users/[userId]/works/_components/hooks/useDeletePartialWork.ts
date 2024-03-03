import { partialWorksAtom } from '@/store/partialWorksAtom'
import { atom } from 'jotai'

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
