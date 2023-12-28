import type { ArticleWithOgp as Props } from '@/usecase/article'
import Link from 'next/link'

import { formatDate } from '@/lib/formatDate'
import { getProviderNick } from '@/usecase/article'
import { ArticleOutlined } from '@mui/icons-material'
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material'

const Text = ({ text }: { text: string }) => (
  <Typography
    sx={{
      color: 'grey',
      fontSize: '1.5rem',
      lineHeight: '1.8rem',
    }}
  >
    {text}
  </Typography>
)

const Media = ({ ogp, articleUrl }: { ogp?: string; articleUrl: string }) =>
  ogp ? (
    <CardMedia component='img' image={ogp} alt={articleUrl} />
  ) : (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <ArticleOutlined sx={{ fontSize: '10rem' }} />
    </Box>
  )

export const ArticleCard = ({
  provider,
  publishedAt,
  ogp,
  articleUrl,
}: Props) => (
  <Link href={articleUrl} style={{ textDecoration: 'none' }}>
    <Card sx={{ display: 'flex', flexDirection: 'column' }}>
      <Media ogp={ogp} articleUrl={articleUrl} />
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Text text={getProviderNick(provider)} />
        <Text text={formatDate(publishedAt)} />
      </CardContent>
    </Card>
  </Link>
)
