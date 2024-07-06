import { CreditCardOff, ElectricBolt, IosShare } from '@mui/icons-material'
import { Box, Grid, Typography } from '@mui/material'

import { Feature } from '../Feature'

export const FeatureSection = () => {
  const features = [
    {
      Icon: ElectricBolt,
      title: '手軽に作れる',
      description: '簡単な操作でポートフォリオを作成することができます。',
    },
    {
      Icon: CreditCardOff,
      title: '無料で使える',
      description: '本サービスの主要な機能は無料で使うことができます。',
    },
    {
      Icon: IosShare,
      title: 'ポートフォリオのシェア',
      description:
        '作成したポートフォリオのURLを共有するだけで簡単に公開できます。また、自分のポートフォリオはMarkdown形式へ出力することも可能です。(開発中)',
    },
  ]

  return (
    <Box sx={{ my: '2rem' }}>
      <Typography variant='h5' sx={{ fontWeight: 'bold', mb: 2 }}>
        どんなサービス ?
      </Typography>
      <Grid container spacing={4} sx={{ display: 'flex' }}>
        {features.map((feature) => (
          <Feature key={feature.title} {...feature} />
        ))}
      </Grid>
    </Box>
  )
}
