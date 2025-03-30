import Link from 'next/link'
import AppLinks from './AppLinks'

export default function Header() {
  return (
    <header className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <Link href="/" className="text-kamni-yellow text-xl font-bold no-underline hover:no-underline">
          KAMNI
        </Link>
        <div className="text-right">
          Семейный фонд
        </div>
      </div>
      <nav>
        <ul className="flex gap-2 text-kamni-yellow">
          <li>
            <Link href="/">О Фонде</Link>
          </li>
          <li>.</li>
          <li>
            <Link href="/stas">STAS</Link>
          </li>
          <li>.</li>
          <li>
            <Link href="/verify">Верификация</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
} 