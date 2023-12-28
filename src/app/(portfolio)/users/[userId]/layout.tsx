import 'ress'

import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'

import { Container } from '@/app/_components/Container/Container'
import { getUserById } from '@/repository/user'
import { CssBaseline } from '@mui/material'

import { Profile } from './_components/Profile'

import type { Metadata } from 'next'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Full Stack',
  description: 'A portfolio site for engineers',
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { userId: string }
}) {
  const user = await getUserById(params.userId)
  if (!user) notFound()

  return (
    <html lang='ja'>
      <body className={inter.className} style={{ color: '#696f73' }}>
        <CssBaseline />
        <Profile {...user} />
        <Container>{children}</Container>
      </body>
    </html>
  )
}
