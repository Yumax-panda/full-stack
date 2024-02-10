import 'ress'
import 'react-toastify/dist/ReactToastify.css'

import { Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify'

import { CssBaseline } from '@mui/material'

import { AuthProvider } from './_components/Provider/AuthProvider'
import { ThemeProvider } from './_components/Provider/ThemeProvider'

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
