import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { rowAtom } from '../atoms/RowAtom'
import Header from './components/Header'
import TextBoard from './components/TextBoard'

export default function Home() {
  const currentRow = useRecoilValue(rowAtom)

  useEffect(() => {
    if (currentRow === 0) {
      localStorage.removeItem('progress')
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col items-center justify-between overflow-hidden">
      <title>Wordle Redesign</title>

      <header>
        <Header />
      </header>

      <main className="flex w-full flex-col items-center justify-center text-center">
        <TextBoard />
      </main>

      <footer className="flex h-20 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="ml-2 h-4" />
        </a>
      </footer>
    </div>
  )
}
