import { Box, type BoxProps } from '@mui/material'

type Props = BoxProps

export const CardContainer = ({ children, ...rest }: Props) => (
  <Box
    sx={{ backgroundColor: '#F8F9FC', p: '7px', borderRadius: '7px' }}
    {...rest}
  >
    {children}
  </Box>
)
