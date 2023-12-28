import { Typography } from '@mui/material'

import type { TypographyProps } from '@mui/material'

type Props = {
  text: string
  sx?: TypographyProps['sx']
}

export const Subtitle = ({ text, sx }: Props) => (
  <Typography
    sx={{
      fontWeight: 'bold',
      fontSize: {
        xs: '1rem',
        md: '1.2rem',
      },
      color: 'gray',
      ...sx,
    }}
  >
    {text}
  </Typography>
)
