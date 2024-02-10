import { ElectricBolt, IosShare, CreditCardOff } from '@mui/icons-material'
import { Box, Grid, Typography } from '@mui/material'

import { Feature } from '../Feature'

export const FeatureSection = () => {
  const features = [
    {
      Icon: ElectricBolt,
      title: '素早く作成',
      description: '簡単な手順でポートフォリオをすぐに作れます',
    },
    {
      Icon: CreditCardOff,
      title: '無料で使用',
      description: '本サービスの主要な機能は無料で使うことができます。',
    },
    {
      Icon: IosShare,
      title: '簡単に共有',
      description:
        '作成したポートフォリオを簡単に共有できます。また、本サービスのおすすめ一覧へ掲載も可能です。(開発中)',
    },
  ]

  return (
    <Box sx={{ my: '2rem' }}>
      <Typography variant='h5' sx={{ fontWeight: 'bold', mb: 2 }}>
        本サービスの特徴
      </Typography>
      <Grid container spacing={4} sx={{ display: 'flex' }}>
        {features.map((feature) => (
          <Feature key={feature.title} {...feature} />
        ))}
      </Grid>
    </Box>
  )
}
