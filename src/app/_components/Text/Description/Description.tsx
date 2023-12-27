import { Typography, type TypographyProps } from '@mui/material'

type Props = {
  description: string
} & Omit<TypographyProps, 'children'>

export const Description = ({ description, ...rest }: Props) => (
  <Typography
    {...rest}
    sx={{
      color: 'grey',
      fontSize: '1rem',
      lineHeight: '1.8rem',
      ...rest['sx'],
    }}
  >
    {description}
  </Typography>
)
