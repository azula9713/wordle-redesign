import { atom } from 'recoil'

export const wordOfTheDayAtom = atom<any>({
  key: 'wordOfTheDayAtom',
  default: [
    {
      letter: '',
      index: 0,
    },
  ],
})
