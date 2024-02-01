import { Typography } from '@mui/material'

import type { TypographyProps } from '@mui/material'

type Props = {
  text: string
  sx?: TypographyProps['sx']
}

export const SectionTitle = ({ text, sx }: Props) => (
  <Typography
    sx={{
      pb: '0.5rem',
      fontWeight: 'bold',
      fontSize: '1.2rem',
      borderBottom: '1px solid #e5e7eb',
      color: 'GrayText',
      ...sx,
    }}
  >
    {text}
  </Typography>
)
