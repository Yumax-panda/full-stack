import { Typography, Box } from '@mui/material'
import Link from 'next/link'
import { Feature } from './_components/Feature'

export default function Home() {
  return (
    <Box>
      <Box sx={{ margin: 'auto', textAlign: 'center' }}>
        <Typography sx={{ fontWeight: 'bold', fontSize: '2rem' }}>
          Full Stack
        </Typography>
        <Typography sx={{ fontSize: '1.2rem', mb: 3 }}>
          エンジニアのためのポートフォリオサイト
        </Typography>

        <Link
          href='#'
          style={{
            margin: 'auto',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            backgroundColor: 'lightgray',
            color: 'black',
            textDecoration: 'none',
          }}
        >
          今すぐ始める
        </Link>
      </Box>
      <Feature />
    </Box>
  )
}
