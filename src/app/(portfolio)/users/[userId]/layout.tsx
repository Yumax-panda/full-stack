import { CssBaseline } from '@mui/material'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Profile from './_components/Profile'
import { Container } from '@/app/_components/Container/Container'
import 'ress'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Full Stack',
  description: 'A portfolio site for engineers',
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { userId: string }
}) {
  return (
    <html lang='ja'>
      <body className={inter.className} style={{ color: '#696f73' }}>
        <CssBaseline />
        <div
          style={{
            backgroundImage:
              'linear-gradient(to bottom right, #2D9596, #9AD0C2)',
            color: 'white',
          }}
        >
          <Profile {...params} />
        </div>
        <Container>{children}</Container>
      </body>
    </html>
  )
}
