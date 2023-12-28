import { Typography } from '@mui/material'

type Props = {
  title: string
}

export const Title = ({ title }: Props) => (
  <Typography sx={{ fontWeight: 'bold', fontSize: '2rem' }}>
    {title}
  </Typography>
)
