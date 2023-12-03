import { Typography, type TypographyProps } from '@mui/material'

type Props = {
  description: string
} & Omit<TypographyProps, 'children'>

export const Description = ({ description, ...rest }: Props) => (
  <Typography {...rest} sx={{ color: 'grey', fontSize: 14 }}>
    {description}
  </Typography>
)
