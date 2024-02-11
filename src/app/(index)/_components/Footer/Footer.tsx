import { Box, Typography } from '@mui/material'

export const Footer = () => (
  <Box
    sx={{
      width: '100%',
      textAlign: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      minHeight: '5rem',
    }}
  >
    <Typography variant='caption' sx={{ display: 'flex', height: '100%' }}>
      <div style={{ margin: 'auto' }}>
        <div>Copyright: 2024-present</div>
        <div>Yumax-panda</div>
      </div>
    </Typography>
  </Box>
)
