import { Box, Typography } from '@mui/material'

import { Feature } from './_components/Feature'
import { SigninButton } from './_components/SignInButton'

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

        <SigninButton />
      </Box>
      <Feature />
    </Box>
  )
}
