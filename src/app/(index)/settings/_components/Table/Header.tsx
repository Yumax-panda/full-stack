import { Box } from '@mui/material'

type Props = {
  children: React.ReactNode
}

export const Header = ({ children }: Props) => (
  <Box
    sx={{
      bgcolor: 'lightgrey',
      p: '0.5rem',
      borderBottom: 'lightgray',
    }}
  >
    {children}
  </Box>
)
