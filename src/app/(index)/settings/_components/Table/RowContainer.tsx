import { Box } from '@mui/material'

type Props = {
  children: React.ReactNode
}

export const RowContainer = ({ children }: Props) => (
  <Box
    sx={{
      display: 'flex',
      width: '100%',
      py: '0.25rem',
      borderTop: '0.5px solid lightgray',
    }}
  >
    {children}
  </Box>
)
