import { Typography } from '@mui/material'

type Props = {
  text: string
}

export const Subtitle = ({ text }: Props) => (
  <Typography sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
    {text}
  </Typography>
)