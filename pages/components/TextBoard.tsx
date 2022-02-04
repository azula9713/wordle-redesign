import { FC, useEffect, useState } from 'react'
import randomWords from 'random-words'

import TextRow from './TextRow'
import { userWordAtom } from '../../atoms/UserWordAtom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { wordOfTheDayAtom } from '../../atoms/WordOfTheDayAtom'
import { rowAtom } from '../../atoms/RowAtom'

const TextBoard: FC = () => {
  const style = {
    container: 'grid grid-rows-6 grid-flow-col',
    button:
      'mt-8 cursor-pointer rounded-lg bg-green-700 py-2 px-4 text-2xl font-bold text-white disabled:opacity-50',
  }

  const setWordOfDay = useSetRecoilState(wordOfTheDayAtom)
  const [generatedWord, setGeneratedWord] = useState('')
  const [currentUserWord, setCurrentUserWord] = useRecoilState(userWordAtom)
  const [currentRow, setCurrentRow] = useRecoilState(rowAtom)

  function generateWord() {
    const wd = randomWords({ exactly: 1, maxLength: 5 })
    return wd[0]
  }

  function validateRow() {
    setCurrentRow(currentRow + 1)
    setCurrentUserWord('')
  }

  useEffect(() => {
    setGeneratedWord(generateWord())
  }, [])

  useEffect(() => {
    if (generatedWord && generatedWord.length === 5) {
      localStorage.setItem('wordOfTheDay', generatedWord)
      setWordOfDay(
        generatedWord
          .split('')
          .map((letter, index) => ({ letter: letter, index: index }))
      )
    } else {
      generateWord()
    }
  }, [generatedWord])

  return (
    <div>
      <div className={style.container}></div>
      {[...Array(6)].map((_, rowIndex) => (
        <TextRow key={rowIndex} rowIndex={rowIndex} />
      ))}
      <button
        className={style.button}
        disabled={currentUserWord.length !== 5}
        onClick={validateRow}
      >
        Validate
      </button>
    </div>
  )
}

export default TextBoard
