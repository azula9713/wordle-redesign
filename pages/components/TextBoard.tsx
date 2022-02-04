import { FC, useEffect } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { rword } from 'rword'

import TextRow from './TextRow'
import { userWordAtom } from '../../atoms/UserWordAtom'
import { wordOfTheDayAtom } from '../../atoms/WordOfTheDayAtom'
import { rowAtom } from '../../atoms/RowAtom'
import {
  progressAtom,
  rowProgressAtom,
  winningStateAtom,
} from '../../atoms/userStatus'

const style = {
  container: 'grid grid-rows-6 grid-flow-col',
  button:
    'mt-8 cursor-pointer rounded-lg bg-green-700 py-2 px-4 text-2xl font-bold text-white disabled:opacity-50',
}

const TextBoard: FC = () => {
  const wordLength = 5
  const setWordOfDay = useSetRecoilState(wordOfTheDayAtom)
  const [currentUserWord, setCurrentUserWord] = useRecoilState(userWordAtom)
  const [currentRow, setCurrentRow] = useRecoilState(rowAtom)
  const [winningState, setWinningState] = useRecoilState(winningStateAtom)
  const [progress, setProgress] = useRecoilState(progressAtom)
  const [rowProgress, setRowProgress] = useRecoilState(rowProgressAtom)

  function generateWOT(len: number) {
    const wd = rword.generate(1, { length: len })

    localStorage.setItem('wordOfTheDay', wd.toString().replace(/"/g, ''))

    const letterArray = wd
      .toString()
      .replace(/"/g, '')
      .split('')
      .map((letter, index) => ({ letter, index }))
    setWordOfDay(letterArray)
  }

  function validateRow() {
    setCurrentRow(currentRow + 1)

    const currentWord = currentUserWord
      .map((letter: any) => letter.letter)
      .join('')

    if (
      currentWord.toLowerCase() ===
      localStorage.getItem('wordOfTheDay')?.toLowerCase()
    ) {
      setWinningState(true)
    } else {
      setCurrentUserWord('')
    }
  }

  function saveProgress() {
    const currRowProgress = [...rowProgress]
    const tempProg = [...progress, currRowProgress]
    localStorage.setItem('progress', JSON.stringify(tempProg))
    setProgress(tempProg)
    setRowProgress([])
  }

  useEffect(() => {
    if (
      rowProgress.length === wordLength &&
      progress.length === currentRow - 1
    ) {
      saveProgress()
    }
  }, [currentRow])

  useEffect(() => {
    if (currentRow === 0) {
      generateWOT(wordLength)
    }
  }, [])

  useEffect(() => {
    if (winningState) {
      alert('You won!')
    }
  }, [winningState])

  return (
    <div>
      <div className={style.container}></div>
      {[...Array(6)].map((_, rowIndex) => (
        <TextRow key={rowIndex} rowIndex={rowIndex} />
      ))}
      <button
        className={style.button}
        disabled={currentUserWord.length !== wordLength}
        onClick={validateRow}
      >
        Validate
      </button>
    </div>
  )
}

export default TextBoard
