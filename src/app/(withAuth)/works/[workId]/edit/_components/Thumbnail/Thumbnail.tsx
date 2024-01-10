import Image from 'next/image'

import { Close } from '@mui/icons-material'
import { Box } from '@mui/material'

type Props = {
  url?: string | null
  onClick?: () => void
}

export const Thumbnail = ({ url, onClick }: Props) => {
  if (!url) return null

  return (
    <Box
      sx={{ position: 'relative', width: 'fit-content', height: 'fit-content' }}
    >
      <Image
        src={url}
        alt='thumbnail'
        width={400}
        height={250}
        style={{ borderRadius: '0.5rem' }}
      />
      <Close
        sx={{
          position: 'absolute',
          top: '0.5rem',
          right: '0.5rem',
          cursor: 'pointer',
        }}
        onClick={onClick}
      />
    </Box>
  )
}
