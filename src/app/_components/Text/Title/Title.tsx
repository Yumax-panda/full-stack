import { Typography } from '@mui/material'

import type { TypographyProps } from '@mui/material'

type Props = {
  title: string
  sx?: TypographyProps['sx']
}

export const Title = ({ title, sx }: Props) => (
  <Typography
    sx={{
      fontWeight: 'bold',
      color: 'GrayText',
      ...sx,
    }}
    component='h1'
    variant='h5'
  >
    {title}
  </Typography>
)
