import Link from 'next/link'
import Header from '../../components/Header'

export default function Stas() {
  return (
    <div className="container">
      <Header />
      
      <section>
        <h1 className="text-3xl font-bold text-kamni-yellow mb-4">STAS</h1>
        
        <div className="mb-4 text-gray-400">
          20.03.2024 14:25
        </div>
        
        <p className="mb-4">
          Содержимое поста STAS находится в разработке.
        </p>
        
        <div className="mt-8">
          <Link href="/" className="text-kamni-yellow">&larr; Вернуться на главную</Link>
        </div>
      </section>
    </div>
  )
} 