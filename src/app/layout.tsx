import 'ress'
import 'react-toastify/dist/ReactToastify.css'

import { Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify'

import { CssBaseline } from '@mui/material'

import { AuthProvider } from './_components/Provider/AuthProvider'
import { ThemeProvider } from './_components/Provider/ThemeProvider'
import { env } from '@/lib/env.mjs'

import type { Metadata } from 'next'
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
  )
}
