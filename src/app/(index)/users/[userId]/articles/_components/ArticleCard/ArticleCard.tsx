import { HistoryEdu } from '@mui/icons-material'
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material'
import Link from 'next/link'

import { formatDate } from '@/lib/formatDate'
import { getProviderNick } from '@/usecase/article'

import type { ArticleWithOgp as Props } from '@/usecase/article'

const Text = ({ text }: { text: string }) => (
  <Typography
    sx={{
      color: 'grey',
      fontSize: '1rem',
    }}
  >
    {text}
  </Typography>
)

// TODO: 画像がない場合の表示を考える
const Media = ({ ogp, articleUrl }: { ogp?: string; articleUrl: string }) =>
  ogp ? (
    <CardMedia
      component='img'
      image={ogp}
      alt={articleUrl}
      sx={{ flexGrow: 1, objectFit: 'contain' }}
    />
  ) : (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
      }}
    >
      <HistoryEdu sx={{ fontSize: '10rem' }} />
    </Box>
  )

export const ArticleCard = ({
  provider,
  publishedAt,
  ogp,
  articleUrl,
}: Props) => (
  <Link
    href={articleUrl}
    style={{ textDecoration: 'none', height: '100%', display: 'flex' }}
  >
    <Card sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }} raised>
      <Media ogp={ogp} articleUrl={articleUrl} />
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Text text={getProviderNick(provider)} />
        <Text text={formatDate(publishedAt)} />
      </CardContent>
    </Card>
  </Link>
)
