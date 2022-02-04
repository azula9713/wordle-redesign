import { atom } from 'recoil'

export const rowAtom = atom<number>({
  key: 'rowAtom',
  default: 0,
})
