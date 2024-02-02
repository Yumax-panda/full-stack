import { CircularProgress } from '@mui/material'

export default function Loading() {
  return (
    <CircularProgress
      color='inherit'
      sx={{ minHeight: '50vh', m: 'auto', display: 'flex' }}
      size='15rem'
    />
  )
}
