import Link from 'next/link'
import Header from '../components/Header'

export default function Verification() {
  return (
    <div className="container">
      <Header />
      
      <section>
        <h1 className="text-3xl font-bold text-kamni-yellow mb-4">Услуга верификации для Ассоциации Монтелиберо</h1>
        
        <div className="mb-4 text-gray-400">
          24.12.2023 17:34
        </div>

        <h2 className="text-2xl font-bold text-kamni-yellow mb-4">Что такое Ассоциация Монтелиберо</h2>
        
        <p className="mb-4">
          Ассоциация Монтелиберо — это экстерриториальная контрактная юрисдикция внутри движения <Link href="https://montelibero.org" className="text-kamni-yellow">«Монтелиберо»</Link>. В отличие от движения, Ассоциация имеет фиксированное членство, внутренние положения, разные степени верификации и рабочие группы по разным проектам (Суды, Нотариат). Всё это фиксируется с помощью токенов на блокчейне Stellar. Главным документов является <Link href="https://montelibero.org/agreement" className="text-kamni-yellow">«Соглашение»</Link>.
        </p>

        <h2 className="text-2xl font-bold text-kamni-yellow mb-4">Зачем нужна верификация</h2>
        
        <p className="mb-4">
          В движении принята презумпция добросовестности. Однако сложно знать всех хорошо и желательно лично. Кроме того, движение начало пополняться большим количеством удалённых участников. Это причины, из-за которых было решено ввести процедуру верификации и фиксировать её двумя токенами участия MTLAP.
        </p>

        <h2 className="text-2xl font-bold text-kamni-yellow mb-4">Какие услуги предоставляет фонд KAMNI?</h2>
        
        <p className="mb-4">
          Фонд предоставляет услуги верификации только удалённым участникам. Мы собираем документы, верифицируем видео-звонком и надежно храним несколько копий, зашифрованных GPG-ключом. Будучи удалённым участником, для получения статуса верифицированного, вам необходима дополнительная верификация от ещё одного верификатора.
        </p>

        <h2 className="text-2xl font-bold text-kamni-yellow mb-4">Процедура</h2>
        
        <p className="mb-4">
          Напишите с просьбой о верификации на <Link href="mailto:verify@kamni.io" className="text-kamni-yellow">почту</Link> или в <Link href="https://t.me/xdefrag" className="text-kamni-yellow">telegram</Link>. В течение суток в рабочие дни с вами свяжутся для прохождения следующих шагов.
        </p>

        <p className="mb-4">Для верификации понадобятся:</p>
        
        <ul className="list-disc pl-8 mb-6 space-y-2">
          <li>любые два или больше документа: загранпаспорт, внутренний паспорт, ВНЖ, водительские права и подобное. Рекомендуется все данные перед отправкой шифровать нашим <Link href="/public.gpg" className="text-kamni-yellow">публичным ключом</Link>;</li>
          <li>любые два контакта: почта, номер телефона, телеграм-аккаунт;</li>
          <li>публичный адрес на блокчейне Stellar. Согласно внутренним соглашениям Ассоциации, эта связка будет публичной;</li>
          <li>дополнительные контакты для связи, если с вами что-либо случится (по желанию).</li>
        </ul>

        <p className="mb-4">
          Если мы с вами не знакомы, понадобится видео-звонок, чтобы с вами лично познакомиться и верифицировать один из ваших документов.
        </p>

        <p className="mb-4">
          Далее вам необходимо будет произвести оплату верификации на адрес <span className="font-mono text-sm">GD5GTXUSBYEKLN242J2QWPTPGRXXV7KKW4FP4YQPP5ZZQ3AA25HN1N3A</span>. В ответ вы получите 4.2 XML как подтверждение верификации.
        </p>

        <h2 className="text-2xl font-bold text-kamni-yellow mb-4">Безопасность</h2>
        
        <p className="mb-4">
          Наш приоритет — это безопасность. Всегда есть вариант общаться только через почту и шифровать сообщения GPG. Все данные будут так же зашифрованы. Ключ расшифровки хранится на YubiKey отдельно от места хранения.
        </p>

        <h2 className="text-2xl font-bold text-kamni-yellow mb-4">Цена</h2>
        
        <p className="mb-4">
          Все расчеты осуществляются на блокчейне Stellar токеном <Link href="https://montelibero.org/eurmtl" className="text-kamni-yellow">EURMTL</Link>.
        </p>
        
        <p className="mb-4">
          Цена верификации: 15 EURMTL.
        </p>
      </section>
    </div>
  )
} 