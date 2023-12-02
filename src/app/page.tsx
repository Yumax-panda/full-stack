import { Button, Typography, Grid, Stack } from '@mui/material'
import { Feature } from './_components/Feature'

export default function Home() {
  return (
    <div>
      <div style={{ margin: 'auto', padding: 20 }}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Typography sx={{ fontWeight: 'bold', fontSize: 32 }}>
              Full Stack
            </Typography>
            <Typography style={{ fontSize: 24 }}>
              自分の技術を世界にアピール
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
            <Stack spacing={2} sx={{ margin: 'auto' }}>
              <Button variant='contained' color='primary'>
                新規登録
              </Button>
              <Button variant='contained' color='primary'>
                ログイン
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </div>
      <div>
        <Feature />
      </div>
    </div>
  )
}
