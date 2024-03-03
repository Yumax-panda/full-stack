import 'ress'
import 'react-toastify/dist/ReactToastify.css'

import { ToastContainer } from 'react-toastify'

import { AuthProvider } from './_components/Provider/AuthProvider'
import { ThemeProvider } from './_components/Provider/ThemeProvider'

import type { Metadata } from 'next'

import { env } from '@/lib/env.mjs'

export const metadata: Metadata = {
  title: 'Full Stack',
  description: '全ての人のためのポートフォリオ作成サービス',
  metadataBase: new URL(env.NEXTAUTH_URL),
  twitter: {
    card: 'summary',
    title: 'Full Stack',
    description: '全ての人のためのポートフォリオ作成サービス',
  },
  openGraph: {
    type: 'website',
    url: env.NEXTAUTH_URL,
    title: 'Full Stack',
    description: '全ての人のためのポートフォリオ作成サービス',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <html lang='ja'>
          <body style={{ color: '#696f73' }}>
            <ToastContainer position='top-center' autoClose={5000} />
            {children}
          </body>
        </html>
      </ThemeProvider>
    </AuthProvider>
  )
}
