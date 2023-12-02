import { Button, Typography, Grid, Box } from '@mui/material'
import { Feature } from './_components/Feature'

export default function Home() {
  return (
    <Box>
      <Box sx={{ margin: 'auto' }}>
        <Grid container sx={{ display: 'flex' }}>
          <Grid item xs={12} md={6}>
            <Typography
              sx={{
                fontWeight: 'bold',
                fontSize: '2rem',
                textAlign: {
                  xs: 'center',
                  md: 'left',
                },
              }}
            >
              Full Stack
            </Typography>
            <Typography
              sx={{
                fontSize: '1.2rem',
                textAlign: {
                  xs: 'center',
                  md: 'left',
                },
                mb: {
                  xs: 2,
                  md: 0,
                },
              }}
            >
              自分の技術を世界にアピール
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
            <Box sx={{ margin: 'auto' }}>
              <Button variant='contained' color='primary' sx={{ m: 1 }}>
                新規登録
              </Button>
              <Button variant='contained' color='primary' sx={{ m: 1 }}>
                ログイン
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Feature />
    </Box>
  )
}
