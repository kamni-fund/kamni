import Link from 'next/link'
import Header from '../../components/Header'

export default function Stas() {
  return (
    <div className="container">
      <Header />
      
      <section>
        <h1 className="text-3xl font-bold text-kamni-yellow mb-4">STAS</h1>
        
        <div className="mb-4 text-gray-400">
          24.12.2023 17:34
        </div>
        
        <p className="mb-4">
          <Link href="/tokens/stas" className="text-kamni-yellow">STAS</Link> — персональный токен, предоставляющий возможность найма Станислава Каркавина из расчета 1 токен = 1 час работы.
        </p>
        
        <p className="mb-4">
          Основная деятельность Станислава — инженер-программист, специализирующийся на микросервисах на Go, со стеком Kubernetes, Redis, PostgreSQL. Консультация, помощь в изучении, проектная разработка, доработка существующего проекта. О разработке лучше договориться заранее, написав в <Link href="https://t.me/xdefrag" className="text-kamni-yellow">telegram</Link> или на <Link href="mailto:notify@kamni.io" className="text-kamni-yellow">почту</Link>.
        </p>
        
        <p className="mb-6">Кроме этого:</p>
        
        <ul className="list-disc pl-8 mb-6 space-y-2">
          <li>консультация по выпуску токенов на блокчейне Stellar;</li>
          <li>ведение соцсетей проектов либертарианского толка;</li>
          <li>консультация по Montelibero project.</li>
        </ul>
        
        <p className="mb-4">
          Если вы приобрели токен, но не смогли договориться о проекте, у фонда есть обязательство выкупить его обратно по цене 10 EURMTL.
        </p>
        
        <p className="mb-8">
          Все споры решаются в <Link href="https://t.me/montelibero_court" className="text-kamni-yellow">МТЛ-суде</Link> или другом признающимся <Link href="https://montelibero.org" className="text-kamni-yellow">Ассоциацией Монтелиберо</Link>.
        </p>
        
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-kamni-yellow mb-4">LATEST POSTS</h2>
          <ul className="list-disc pl-8">
            <li>
              <Link href="/posts/stas" className="text-kamni-yellow">STAS</Link>
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
} 