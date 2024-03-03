import { atom } from 'jotai'
import type { PartialWork } from '@/repository/work'

export const partialWorksAtom = atom<PartialWork[]>([])
