import { FC, useState, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { rowAtom } from '../../atoms/RowAtom'
import { userWordAtom } from '../../atoms/UserWordAtom'
import { wordOfTheDayAtom } from '../../atoms/WordOfTheDayAtom'

interface Props {
  letter: string
  isEnabled: boolean
  textIndex: number
}

const TextBox: FC<Props> = ({ letter, isEnabled }) => {
  const style = {
    container:
      'flex h-14 w-14 items-center justify-center border-2 rounded-lg p-2',
    input:
      'm-0 h-full w-full cursor-none bg-none p-0 text-center uppercase font-bold text-3xl border-none outline-none',
  }
  const [userLetter, setUserLetter] = useState('')
  const [bgColor, setBgColor] = useState('#fff')
  const [letterColor, setLetterColor] = useState('#000')
  const [currentUserWord, setCurrentUserWord] = useRecoilState(userWordAtom)
  const wordOfDay = useRecoilValue(wordOfTheDayAtom)
  const currentRow = useRecoilValue(rowAtom)

  useEffect(() => {
    if (userLetter.length === 1) {
      setCurrentUserWord(currentUserWord + userLetter)
    } else {
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
