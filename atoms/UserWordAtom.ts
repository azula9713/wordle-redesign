import { atom } from 'recoil'

export const userWordAtom = atom<any>({
  key: 'userWordAtom',
  default: [],
})
