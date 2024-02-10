import { Box, Typography } from '@mui/material'

import { SignInButton } from './_components/SignInButton'
import { FeatureSection } from './_components/FeatureSection'

export default function Home() {
  return (
    <Box sx={{ margin: 'auto', textAlign: 'center' }}>
      <Typography variant='h4' sx={{ fontWeight: 'bold' }}>
        Full Stack
      </Typography>
      <Typography
        variant='subtitle1'
        sx={{
          fontWeight: 'bold',
          flexDirection: {
            xs: 'column',
            sm: 'row',
          },
          display: 'flex',
          justifyContent: 'center',
          my: "0.5rem"
        }}
      >
        <div>全てのエンジニアのための</div>
        <div>ポートフォリオ作成サービス</div>
      </Typography>
      <SignInButton />
      <FeatureSection />
    </Box>
  )
}
