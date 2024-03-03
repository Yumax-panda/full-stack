import type { PartialWork } from '@/repository/work'
import { atom, useAtom } from 'jotai'
import { useHydrateAtoms } from 'jotai/utils'

type Props = {
  worksFromServer: PartialWork[]
}

type UseWorksAtomReturn = {
  works: PartialWork[]
}

const worksAtom = atom<PartialWork[]>([])

export const useWorksAtom = ({
  worksFromServer,
}: Props): UseWorksAtomReturn => {
  useHydrateAtoms([[worksAtom, worksFromServer]])
  const [works] = useAtom(worksAtom)

  return { works }
}
