import type { PartialWork as Props } from '@/repository/work'
import Link from 'next/link'

import { formatDate } from '@/lib/formatDate'
import { routes } from '@/lib/routes'
import { AutoAwesomeOutlined, LockOutlined } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'

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

export const WorkCard = ({
  id,
  title,
  thumbnail,
  updatedAt,
  isPrivate,
}: Props) => (
  <Link
    href={routes.workDetail(id)}
    passHref
    style={{ textDecoration: 'none' }}
  >
    <Card sx={{ maxWidth: 368, position: 'relative' }}>
      {isPrivate && (
        <Avatar
          sx={{
            position: 'absolute',
            top: '0.5rem',
            left: '0.5rem',
            fontSize: '2rem',
            zIndex: 1,
          }}
        >
          <LockOutlined />
        </Avatar>
      )}
      {thumbnail ? (
        <CardMedia
          image={thumbnail}
          alt={title}
          width={368}
          height={230}
          component='img'
        />
      ) : (
        <ThumbnailWithoutImage />
      )}
      <CardContent>
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
