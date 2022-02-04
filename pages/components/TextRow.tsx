import { FC } from 'react'
import { useRecoilValue } from 'recoil'
import { rowAtom } from '../../atoms/RowAtom'
import { wordOfTheDayAtom } from '../../atoms/WordOfTheDayAtom'
import TextBox from './TextBox'

interface Props {
  rowIndex: number
}

const TextRow: FC<Props> = ({ rowIndex }) => {
  const style = {
    container: 'grid grid-cols-5 gap-2 my-2',
  }

  const wordOfDay = useRecoilValue(wordOfTheDayAtom)
  const currentRow = useRecoilValue(rowAtom)

  return (
    <div className={style.container}>
      {[...Array(5)].map((_, index) => (
        <TextBox
          key={index}
          letter={wordOfDay[index]?.letter}
          textIndex={index}
          isEnabled={rowIndex === currentRow}
        />
      ))}
    </div>
  )
}

export default TextRow
