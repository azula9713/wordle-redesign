import { FC, useState, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { rowAtom } from '../../atoms/RowAtom'
import { rowProgressAtom } from '../../atoms/userStatus'
import { userWordAtom } from '../../atoms/UserWordAtom'
import { wordOfTheDayAtom } from '../../atoms/WordOfTheDayAtom'

interface Props {
  letter: string
  isEnabled: boolean
  textIndex: number
}

const style = {
  container:
    'flex h-14 w-14 items-center justify-center border-2 rounded-lg p-2',
  input:
    'm-0 h-full w-full cursor-none bg-none p-0 text-center uppercase font-bold text-3xl border-none outline-none',
}

const TextBox: FC<Props> = ({ letter, isEnabled, textIndex }) => {
  const [userLetter, setUserLetter] = useState('')
  const [bgColor, setBgColor] = useState('#fff')
  const [letterColor, setLetterColor] = useState('#000')
  const [currentUserWord, setCurrentUserWord] = useRecoilState(userWordAtom)
  const [rowProgress, setRowProgress] = useRecoilState(rowProgressAtom)
  const wordOfDay = useRecoilValue(wordOfTheDayAtom)
  const currentRow = useRecoilValue(rowAtom)

  useEffect(() => {
    if (userLetter.length > 0) {
      const letterObj = {
        letter: userLetter,
        index: textIndex,
      }
      setCurrentUserWord([...currentUserWord, letterObj])

      if (userLetter.toUpperCase() === letter?.toUpperCase()) {
        const tempProg = {
          letter: userLetter,
          index: textIndex,
          status: 'correct',
        }
        setRowProgress([...rowProgress, tempProg])
      } else {
        //check if the letter is available inside the word array object
        const letterIndex = wordOfDay.findIndex(
          (word: any) => word.letter.toUpperCase() === userLetter.toUpperCase()
        )
        if (letterIndex !== -1) {
          const tempProg = {
            letter: userLetter,
            index: textIndex,
            status: 'incorrect',
          }
          setRowProgress([...rowProgress, tempProg])
        } else {
          const tempProg = {
            letter: userLetter,
            index: textIndex,
            status: 'invalid',
          }
          setRowProgress([...rowProgress, tempProg])
        }
      }
    } else {
      if (currentUserWord.length > 0) {
        setCurrentUserWord(
          currentUserWord?.filter(
            (letter: { letetr: string; index: number }) =>
              letter.index !== textIndex
          )
        )
      }

      setLetterColor('#000')
      setBgColor('#fff')
    }
  }, [userLetter])

  useEffect(() => {
    if (currentRow > 0 && userLetter.length === 1) {
      setLetterColor('#fff')
      if (userLetter.toUpperCase() === letter?.toUpperCase()) {
        setBgColor('#279327')
      } else {
        //check if the letter is available inside the word array object
        const letterIndex = wordOfDay.findIndex(
          (word: any) => word.letter.toUpperCase() === userLetter.toUpperCase()
        )
        if (letterIndex !== -1) {
          setBgColor('#cbb722')
        } else {
          setBgColor('#e53935')
        }
      }
    }
  }, [currentRow])

  return (
    <div className={style.container} style={{ backgroundColor: bgColor }}>
      <input
        type="text"
        maxLength={1}
        className={style.input}
        style={{ backgroundColor: bgColor, color: letterColor }}
        value={userLetter}
        disabled={!isEnabled}
        onChange={(e) => setUserLetter(e.target.value)}
      />
    </div>
  )
}

export default TextBox
