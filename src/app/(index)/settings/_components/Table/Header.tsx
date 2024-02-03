import { Box } from '@mui/material'

type Props = {
  children: React.ReactNode
}

export const Header = ({ children }: Props) => (
  <Box
    sx={{
      bgcolor: 'grey.200',
      p: '0.5rem',
      borderTopLeftRadius: '0.5rem',
      borderTopRightRadius: '0.5rem',
      borderBottom: 'lightgray 1px solid',
    }}
  >
    {children}
  </Box>
)
