import type { SvgIconComponent } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'

export interface EmptyProps {
  Icon: SvgIconComponent
  title: string
}

export function Empty({ Icon, title }: EmptyProps) {
  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      textAlign='center'
      margin='auto'
      p={2}
    >
      <Icon sx={{ fontSize: '4rem' }} />
      <Typography variant='h6' gutterBottom>
        {title}
      </Typography>
    </Box>
  )
}
