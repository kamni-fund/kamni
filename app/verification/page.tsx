import Header from '../components/Header'

export default function Verification() {
  return (
    <div className="container">
      <Header />
      
      <section>
        <h1 className="text-3xl font-bold text-kamni-yellow mb-4">Верификация</h1>
        
        <p className="mb-4">
          Страница с информацией о верификации находится в разработке.
        </p>
        
        <p className="mb-4">
          Для заявок на верификацию используйте почту: <a href="mailto:verify@kamni.io">verify@kamni.io</a>
        </p>
      </section>
    </div>
  )
} 