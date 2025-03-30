import Link from 'next/link'

export default function Header() {
  return (
    <header className="mb-8">
      <div className="container">
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
              <Link href="/tokens">Токены</Link>
            </li>
            <li>.</li>
            <li>
              <Link href="/verification">Верификация</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
} 