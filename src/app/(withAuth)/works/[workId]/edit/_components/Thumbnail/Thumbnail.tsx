import Image from 'next/image'

import { Close } from '@mui/icons-material'
import { Box, IconButton, Tooltip } from '@mui/material'

type Props = {
  url?: string | null
  onClick?: () => void
}

export const Thumbnail = ({ url, onClick }: Props) => {
  if (!url) return null

  return (
    <Box
      sx={{
        position: 'relative',
        width: { sm: 400 },
        height: { sm: 250 },
        m: '2rem auto',
      }}
    >
      <Image
        src={url}
        alt='thumbnail'
        width={400}
        height={250}
        style={{ borderRadius: '0.5rem', width: '100%', height: '100%' }}
      />
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
    </Box>
  )
}
