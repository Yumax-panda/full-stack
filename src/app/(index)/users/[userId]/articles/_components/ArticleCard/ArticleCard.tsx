import { HistoryEdu } from '@mui/icons-material'
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material'

import type { ArticleWithOgp as Props } from '@/usecase/article'

import { Link } from '@/app/_components/Link'
import { formatDate } from '@/lib/formatDate'
import { getProviderNick } from '@/usecase/article'

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
  <Link href={articleUrl} style={{ height: '100%', display: 'flex' }}>
    <Card
      sx={{
        maxWidth: 368,
        position: 'relative',
        transition: 'transform 0.3s',
        ':hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
        },
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
      }}
    >
      <Media ogp={ogp} articleUrl={articleUrl} />
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Text text={getProviderNick(provider)} />
        <Text text={formatDate(publishedAt)} />
      </CardContent>
    </Card>
  </Link>
)
