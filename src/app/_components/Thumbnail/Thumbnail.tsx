import { Close } from '@mui/icons-material'
import { Box, IconButton, Tooltip } from '@mui/material'
import Image from 'next/image'

type Props = {
  url?: string | null
  onClick?: () => void
  omitDeleteButton?: boolean
}

export const Thumbnail = ({ url, onClick, omitDeleteButton }: Props) => {
  if (!url) return null

  return (
    <Box
      sx={{
        position: 'relative',
        width: { sm: 400 },
        m: '2rem auto',
      }}
    >
      <Image
        src={url}
        alt='thumbnail'
        width={400}
        height={250}
        style={{
          borderRadius: '0.5rem',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          boxShadow: '0 0 0.5rem rgba(0, 0, 0, 0.2)',
        }}
        priority
      />
      {!omitDeleteButton ? (
        <Tooltip title='削除'>
          <IconButton
            sx={{
              position: 'absolute',
              top: '0.5rem',
              right: '0.5rem',
              color: 'white',
            }}
            onClick={onClick}
          >
            <Close />
          </IconButton>
        </Tooltip>
      ) : null}
    </Box>
  )
}
