import type { Metadata } from 'next'
import './globals.css'
import Footer from './components/Footer'

export const metadata: Metadata = {
  title: 'KAMNI - Семейный фонд',
  description: 'Семейный фонд KAMNI занимается накоплением средств для членов семьи',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className="bg-kamni-dark h-full">
      <body className="text-white bg-kamni-dark flex flex-col min-h-screen">
        <main className="flex-grow py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
} 