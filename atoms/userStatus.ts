import { atom } from 'recoil'

export const authStateAtom = atom<boolean>({
  key: 'authStateAtom',
  default: false,
})

export const winningStateAtom = atom<boolean>({
  key: 'authStateAtom',
  default: false,
})

export const progressAtom = atom<any>({
  key: 'progressAtom',
  default: [],
})

export const rowProgressAtom = atom<any>({
  key: 'rowProgressAtom',
  default: [],
})
