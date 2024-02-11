import { Box, Container, Typography } from '@mui/material'

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
          my: '0.5rem',
        }}
      >
        <div>全てのエンジニアのための</div>
        <div>ポートフォリオ作成サービス</div>
      </Typography>
      <SignInButton />
      <FeatureSection />
      <Container maxWidth='md'>
        <Typography
          variant='body1'
          sx={{ mt: '1rem', textAlign: 'left', lineHeight: 2 }}
        >
          このサービスは皆さんが手軽にポートフォリオを作って共有できることを目指しています。
          皆さんが今までに培ってきたスキルや達成したこと、挑戦していることなんでも共有しましょう。
        </Typography>
      </Container>
    </Box>
  )
}
