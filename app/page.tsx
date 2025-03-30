import Link from 'next/link'
import Header from './components/Header'
import PgpKey from './components/PgpKey'

export default function Home() {
  return (
    <div className="container">
      <Header />
      
      <section>
        <h1 className="text-3xl font-bold text-kamni-yellow mb-4">О Фонде</h1>
        
        <div className="mb-4 text-gray-400">
          15.12.2023 18:12
        </div>
        
        <p className="mb-4">
          Семейный фонд «KAMNI» занимается накоплением средств для членов семьи:
        </p>
        
        <ul className="list-disc pl-8 mb-6 space-y-2">
          <li>
            Выступает эмитентом <Link href="/tokens">токенов</Link> услуг;
          </li>
          <li>
            Предоставляет услуги <Link href="/verification">верификации</Link> для <Link href="https://montelibero.org">Ассоциации Монтелиберо</Link>.
          </li>
        </ul>
        
        <div className="mb-4">
          <p className="mb-2">Адрес на блокчейне Stellar: <span className="font-mono text-sm">GCUEVVS4KIHZM7DAHKXIRWSCN3V3Y4KX6UNNUU7PV73VQK44CNKAMNI</span></p>
        </div>
        
        <div className="mb-6">
          <p>Почта для заявок на верификацию: <a href="mailto:verify@kamni.io">verify@kamni.io</a>.</p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl mb-2">Публичный GPG-ключ:</h2>
          <PgpKey />
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-kamni-yellow mb-4">LATEST POSTS</h2>
          <ul className="list-disc pl-8">
            <li>
              <Link href="/posts/stas">STAS</Link>
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
} 