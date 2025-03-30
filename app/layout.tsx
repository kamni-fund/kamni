import type { Metadata } from 'next'
import './globals.css'
import React from 'react'

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
    <html lang="ru" className="bg-kamni-dark">
      <body className="text-white bg-kamni-dark">
        <main className="min-h-screen py-8">
          {children}
        </main>
        <footer className="py-4 text-center text-sm">
          <div className="container">
            <p>© 2025 <a href="https://creativecommons.org/licenses/by/4.0/" className="text-kamni-yellow">CC BY 4.0</a></p>
          </div>
        </footer>
      </body>
    </html>
  )
} 