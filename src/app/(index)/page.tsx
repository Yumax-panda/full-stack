import { Box, Typography } from '@mui/material'

import { SignInButton } from './_components/SignInButton'
import { FeatureSection } from './_components/FeatureSection'

export default function Home() {
  return (
    <Box>
      <Box sx={{ margin: 'auto', textAlign: 'center' }}>
        <Typography variant='h4' sx={{ fontWeight: 'bold' }}>
          Full Stack
        </Typography>
        <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>
          全てのエンジニアのためのポートフォリオ作成サービス
        </Typography>
        <SignInButton />
        <Typography variant='caption'>About</Typography>
        <FeatureSection />
      </Box>
    </Box>
  )
}
