import type { Dispatch, SetStateAction } from 'react'

import { AutoAwesomeOutlined, LockOutlined } from '@mui/icons-material'
import { Avatar, Box, Card, CardContent, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

import { WorkMenu } from '../WorkMenu'

import type { PartialWork } from '@/repository/work'

import { formatDate } from '@/lib/formatDate'
import { routes } from '@/lib/routes'

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
  isMine,
  setWorks,
}: PartialWork & {
  isMine: boolean
  setWorks: Dispatch<SetStateAction<PartialWork[]>>
}) => (
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
    {isMine && (
      <Box
        sx={{
          position: 'absolute',
          bottom: '0.5rem',
          right: '0.5rem',
          zIndex: 1,
        }}
      >
        <WorkMenu workId={id} setWorks={setWorks} />
      </Box>
    )}
    <Link
      href={routes.workDetail(id)}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      {thumbnail ? (
        <Image
          src={thumbnail}
          alt={title}
          width={368}
          height={230}
          style={{ objectFit: 'cover', borderBottom: '1px solid lightgray' }}
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
    </Link>
  </Card>
)
