import { atom } from 'recoil'

export const userWordAtom = atom<string>({
  key: 'userWordAtom',
  default: '',
})
