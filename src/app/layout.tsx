import 'ress'
import 'react-toastify/dist/ReactToastify.css'

import { CssBaseline } from '@mui/material'
import { Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import { Provider as JotaiProvider } from 'jotai'

import { AuthProvider } from './_components/Provider/AuthProvider'
import { ThemeProvider } from './_components/Provider/ThemeProvider'

import type { Metadata } from 'next'

import { env } from '@/lib/env.mjs'

const inter = Inter({ subsets: ['latin'] })

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
    <JotaiProvider>
      <AuthProvider>
        <ThemeProvider>
          <html lang='ja'>
            <body className={inter.className}>
              <CssBaseline />
              <div style={{ color: '#696f73' }}>
                <ToastContainer position='top-center' autoClose={5000} />
                {children}
              </div>
            </body>
          </html>
        </ThemeProvider>
      </AuthProvider>
    </JotaiProvider>
  )
}
