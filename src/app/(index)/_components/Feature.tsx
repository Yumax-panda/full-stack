import { Description } from '@/app/_components/Text/Description'
import { Sectiontitle } from '@/app/_components/Text/Sectiontitle'
import { Box } from '@mui/material'

const features = [
  {
    title: '完全無料',
    description:
      '現在、本サイトが提供する全ての機能は無料でご利用いただけます。',
  },
  {
    title: '手軽にポートフォリオを作成',
    description:
      'スキルや制作物、執筆記事など、あなたがこれまでに取り組んできた記録を手軽な入力で共有できます。ポートフォリオを作ったらURLを共有するだけですぐに公開できます。',
  },
  {
    title: '誰でも開発に参加可能',
    description:
      '本サイトのソースコードはGitHubで公開されており、ブラックボックス化を避けています。機能の追加、不具合の修正のプルリクエストを送ることもできます。開発メンバーを随時募集しているので興味ある方はぜひ参加してみてください。',
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
