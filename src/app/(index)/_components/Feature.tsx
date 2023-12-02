import { MoneyOff, Share, FileDownload } from '@mui/icons-material'
import { Typography, Grid, Box } from '@mui/material'
import { Description } from '@/components/Text/Description'

type Feature = {
  title: string
  description: string
  icon: React.ReactNode
}

// TODO: リリース時に文言を修正
const features = [
  {
    title: '完全無料',
    description:
      '本サイトが提供する全ての機能は無料でご利用いただけます。本サイトが提供する全ての機能は無料でご利用いただけます。本サイトが提供する全ての機能は無料でご利用いただけます。本サイトが提供する全ての機能は無料でご利用いただけます。',
    icon: MoneyOff,
  },
  {
    title: '手軽に共有',
    description:
      'URLを共有するだけで自分のポートフォリオを簡単に共有できます。URLを共有するだけで自分のポートフォリオを簡単に共有できます。URLを共有するだけで自分のポートフォリオを簡単に共有できます。URLを共有するだけで自分のポートフォリオを簡単に共有できます。',
    icon: Share,
  },
  {
    title: 'PDF出力',
    description:
      '自分のポートフォリオをPDFに出力できます。自分のポートフォリオをPDFに出力できます。自分のポートフォリオをPDFに出力できます。自分のポートフォリオをPDFに出力できます。',
    icon: FileDownload,
  },
]

export const Feature = () => {
  return (
    <Grid container spacing={2} sx={{ py: 5 }}>
      {features.map((feature) => (
        <Grid item xs={12} md={4} key={feature.title}>
          <Box
            sx={{
              width: 30,
              height: 30,
              bgcolor: 'skyblue',
              borderRadius: 2,
              display: 'flex',
              mb: 1,
            }}
          >
            <feature.icon
              sx={{ fontSize: 26, margin: 'auto', color: 'white' }}
            />
          </Box>
          <Typography sx={{ fontWeight: 'bold', fontSize: 18 }}>
            {feature.title}
          </Typography>
          <Description description={feature.description} />
        </Grid>
      ))}
    </Grid>
  )
}
