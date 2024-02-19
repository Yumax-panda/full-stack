import { Box } from '@mui/material'

type Props = {
  children: React.ReactNode
}

export const CardContainer = ({ children }: Props) => (
  <Box sx={{ backgroundColor: '#F8F9FC', p: '7px', borderRadius: '7px' }}>
    {children}
  </Box>
)
