import { Container } from '@mui/material'

import { Header } from './_components/Header'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <Container sx={{ py: '2rem' }}>{children}</Container>
    </div>
  )
}
