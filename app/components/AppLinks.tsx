import Link from "next/link";

const AppLinks = {
  Home: () => (
    <Link href="/" className="text-kamni-yellow">
      Главная
    </Link>
  ),
  Stas: () => (
    <Link href="/stas" className="text-kamni-yellow">
      STAS
    </Link>
  ),
  Verify: () => (
    <Link href="/verify" className="text-kamni-yellow">
      Верификация
    </Link>
  ),
  MonteliberoAssociation: () => (
    <Link href="https://montelibero.org/mtla/" className="text-kamni-yellow">
      Ассоциация Монтелиберо
    </Link>
  ),
  MonteliberoAgreement: () => (
    <Link
      href="https://github.com/Montelibero/MTLA-Documents/blob/main/Internal/Agreement/Agreement.ru.md"
      className="text-kamni-yellow"
    >
      «Соглашение»
    </Link>
  ),
  MonteliberoCourt: () => (
    <Link href="https://montelibero.org/mtl_court/" className="text-kamni-yellow">
      МТЛ-суде
    </Link>
  ),
  Email: ({ address }: { address: string }) => (
    <Link href={`mailto:${address}`} className="text-kamni-yellow">
      {address}
    </Link>
  ),
  Telegram: () => (
    <Link href="https://t.me/xdefrag" className="text-kamni-yellow">
      telegram
    </Link>
  ),
  EurMtl: () => (
    <Link href="https://montelibero.org/eurmtl" className="text-kamni-yellow">
      EURMTL
    </Link>
  ),
  PublicKey: () => (
    <Link href="/public.gpg" className="text-kamni-yellow">
      публичным ключом
    </Link>
  ),
  Tokens: () => (
    <Link href="/" className="text-kamni-yellow">
      токенов
    </Link>
  ),
};

export default AppLinks;
