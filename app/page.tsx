import React from "react";
import Link from "next/link";
import PgpKey from "./components/PgpKey";
import AppLinks from "./components/AppLinks";

export default function Home() {
  return (
    <div className="container">
      <section>
        <h1 className="text-3xl font-bold text-kamni-yellow mb-4">О Фонде</h1>

        <p className="mb-4">
          Семейный фонд «KAMNI» занимается накоплением средств для членов семьи:
        </p>

        <ul className="list-disc pl-8 mb-6 space-y-2">
          <li>
            Выступает эмитентом <AppLinks.Stas />
          </li>
          <li>
            Предоставляет услуги <AppLinks.Verify /> для{" "}
            <AppLinks.MonteliberoAssociation />.
          </li>
        </ul>

        <div className="mb-4">
          <p className="mb-2">
            Адрес на блокчейне Stellar:{" "}
            <span className="font-mono text-sm">
              GCUEVVS4KIHZM7DAHKXIRWSCN3V3Y4KX6UNNUU7PV73VQK44CNKAMNI
            </span>
          </p>
        </div>

        <div className="mb-6">
          <p>
            Почта для заявок на верификацию:{" "}
            <AppLinks.Email address="verify@kamni.io" />.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl mb-2">Публичный GPG-ключ:</h2>
          <PgpKey />
        </div>
      </section>
    </div>
  );
}
