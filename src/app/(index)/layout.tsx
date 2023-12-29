import { Container } from '@mui/material'

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Container sx={{ py: '2rem' }}>{children}</Container>
}
