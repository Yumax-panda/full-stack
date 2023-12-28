import { Typography } from '@mui/material'

import type { TypographyProps } from '@mui/material'

type Props = {
  description: string
  sx?: TypographyProps['sx']
}

export const Description = ({ description, sx }: Props) => (
  <Typography
    sx={{
      color: 'grey',
      fontSize: '1rem',
      lineHeight: '1.8rem',
      ...sx,
    }}
  >
    {description}
  </Typography>
)
