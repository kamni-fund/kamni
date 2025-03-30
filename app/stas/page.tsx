import AppLinks from "../components/AppLinks";

export default function Stas() {
  return (
    <div className="container">
      <section>
        <h1 className="text-3xl font-bold text-kamni-yellow mb-4">STAS</h1>

        <p className="mb-4">
          <AppLinks.Stas /> — персональный токен, предоставляющий возможность найма Станислава
          Каркавина из расчета 1 токен = 1 час работы.
        </p>

        <p className="mb-4">
          Основная деятельность Станислава — инженер-программист, специализирующийся на
          микросервисах на Go, со стеком Kubernetes, Redis, PostgreSQL. Консультация, помощь в
          изучении, проектная разработка, доработка существующего проекта. О разработке лучше
          договориться заранее, написав в <AppLinks.Telegram /> или на{" "}
          <AppLinks.Email address="stas@panarchy.now" />.
        </p>

        <p className="mb-6">Кроме этого:</p>

        <ul className="list-disc pl-8 mb-6 space-y-2">
          <li>консультация по выпуску токенов на блокчейне Stellar;</li>
          <li>ведение соцсетей проектов либертарианского толка;</li>
          <li>консультация по Montelibero project.</li>
        </ul>

        <p className="mb-4">
          Если вы приобрели токен, но не смогли договориться о проекте, у фонда есть обязательство
          выкупить его обратно по цене 10 EURMTL.
        </p>

        <p className="mb-8">
          Все споры решаются в <AppLinks.MonteliberoCourt /> или другом признающимся{" "}
          <AppLinks.MonteliberoAssociation />.
        </p>
      </section>
    </div>
  );
}
