import type { PartialWork as Props } from '@/repository/work'
import Image from 'next/image'
import Link from 'next/link'

import { formatDate } from '@/lib/formatDate'
import { routes } from '@/lib/routes'
import { AutoAwesomeOutlined } from '@mui/icons-material'
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material'

const ThumbnailWithoutImage = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'grey.300',
      height: 230,
    }}
  >
    <AutoAwesomeOutlined sx={{ fontSize: 80 }} />
  </Box>
)

export const WorkCard = ({ id, title, thumbnail, updatedAt }: Props) => (
  <Link
    href={routes.workDetails(id)}
    passHref
    style={{ textDecoration: 'none' }}
  >
    <Card sx={{ maxWidth: 368 }}>
      {thumbnail ? (
        <Image src={thumbnail} alt={title} width={368} height={230} objectFit='cover' />
      ) : (
        <ThumbnailWithoutImage />
      )}
      <CardContent sx={{ height: '3rem' }}>
        <Typography
          sx={{
            fontSize: '1.2rem',
            color: 'GrayText',
            mb: '0.5rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {title}
        </Typography>
        <Typography sx={{ fontSize: '1rem', color: 'lightgray' }}>
          最終更新：{formatDate(updatedAt)}
        </Typography>
      </CardContent>
    </Card>
  </Link>
)
