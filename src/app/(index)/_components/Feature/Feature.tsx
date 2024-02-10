import type { SvgIconComponent } from '@mui/icons-material'
import { Box, Grid, Typography } from '@mui/material'

type Props = {
  Icon: SvgIconComponent
  title: string
  description: string
}

export const Feature = ({ Icon, title, description }: Props) => (
  <Grid item xs={12} md={4}>
    <Box
      sx={{
        textAlign: 'left',
        p: '1rem',
        border: '2px solid  rgb(99 102 241)',
        borderRadius: 'calc(1rem + 2px)',
        height: '100%',
      }}
    >
      <Icon
        sx={{
          fontSize: '24px',
          color: ' rgb(99 102 241)',
          opacity: 0.8,
        }}
      />
      <Typography variant='h6' sx={{ fontWeight: 'bold', my: '0.5rem' }}>
        {title}
      </Typography>
      <Typography variant='body1'>{description}</Typography>
    </Box>
  </Grid>
)
