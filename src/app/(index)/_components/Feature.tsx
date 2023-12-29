import { Box } from '@mui/material'
import { Description } from '@/app/_components/Text/Description'
import { Sectiontitle } from '@/app/_components/Text/Sectiontitle'

// TODO: リリース時に文言を修正
const features = [
  {
    title: '完全無料',
    description:
      '本サイトが提供する全ての機能は無料でご利用いただけます。本サイトが提供する全ての機能は無料でご利用いただけます。本サイトが提供する全ての機能は無料でご利用いただけます。本サイトが提供する全ての機能は無料でご利用いただけます。',
  },
  {
    title: '手軽に共有',
    description:
      'URLを共有するだけで自分のポートフォリオを簡単に共有できます。URLを共有するだけで自分のポートフォリオを簡単に共有できます。URLを共有するだけで自分のポートフォリオを簡単に共有できます。URLを共有するだけで自分のポートフォリオを簡単に共有できます。',
  },
  {
    title: 'PDF出力',
    description:
      '自分のポートフォリオをPDFに出力できます。自分のポートフォリオをPDFに出力できます。自分のポートフォリオをPDFに出力できます。自分のポートフォリオをPDFに出力できます。',
  },
]

export const Feature = () => {
  return (
    <div>
      {features.map((feature) => (
        <Box key={feature.title} sx={{ my: '0.5rem' }}>
          <Sectiontitle text={feature.title} />
          <Description description={feature.description} />
        </Box>
      ))}
    </div>
  )
}
