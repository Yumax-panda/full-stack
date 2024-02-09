import { Box } from '@mui/material'

type Props = {
  children: React.ReactNode
}

export const Container = ({ children }: Props) => (
  <Box
    sx={{
      border: '1px solid gray',
      borderRadius: '0.5rem',
    }}
  >
    {children}
  </Box>
)
