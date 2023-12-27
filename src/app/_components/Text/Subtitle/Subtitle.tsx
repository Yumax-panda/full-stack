import { Typography } from '@mui/material'

type Props = {
  text: string
}

export const Subtitle = ({ text }: Props) => (
  <Typography
    sx={{
      pb: '0.5rem',
      fontWeight: 'bold',
      fontSize: '1.2rem',
      borderBottom: '1px solid #e5e7eb',
    }}
  >
    {text}
  </Typography>
)