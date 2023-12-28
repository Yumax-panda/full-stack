import 'ress'

import { Inter } from 'next/font/google'

import { Container } from '@/app/_components/Container/Container'
import { CssBaseline } from '@mui/material'

import type { Metadata } from 'next'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Full Stack',
  description: 'A portfolio site for engineers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='ja'>
      <body className={inter.className}>
        <CssBaseline />
        <Container style={{ color: '#696f73', paddingTop: '2rem' }}>
          {children}
        </Container>
      </body>
    </html>
  )
}
