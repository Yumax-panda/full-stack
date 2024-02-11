import { Container } from '@mui/material'

import { Header } from './_components/Header'
import { Footer } from './_components/Footer'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <div
        style={{
          display: 'grid',
          gridTemplateRows: '1fr auto',
          gridTemplateColumns: '100%',
          minHeight: '100vh',
        }}
      >
        <Container sx={{ py: '2rem' }}>{children}</Container>
        <Footer />
      </div>
    </div>
  )
}
