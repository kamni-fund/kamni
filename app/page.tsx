import { Card, CardContent } from "@/components/ui/card";
import AppLinks from "./components/AppLinks";
import CopyButton from "./components/CopyButton";
import PgpKey from "./components/PgpKey";

const STELLAR_ADDRESS = "GCUEVVS4KIHZM72DAHKXIRWSCN3V3Y4KX6UNNUU7PV73VQK44CNKAMNI";

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
            Предоставляет услуги <AppLinks.Verify /> для <AppLinks.MonteliberoAssociation />.
          </li>
        </ul>

        <div className="mb-4">
          <p className="mb-3">Адрес на блокчейне Stellar:</p>
          <Card className="mb-2">
            <CardContent className="p-3 flex items-center justify-between">
              <code className="text-sm font-mono block truncate">{STELLAR_ADDRESS}</code>
              <CopyButton text={STELLAR_ADDRESS} displayText="" />
            </CardContent>
          </Card>
        </div>

        <div className="mb-6">
          <p>
            Почта для заявок на верификацию: <AppLinks.Email address="stas@panarchy.now" />.
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
