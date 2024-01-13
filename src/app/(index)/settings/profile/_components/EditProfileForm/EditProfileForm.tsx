import type { User as Props } from '@prisma/client'
import { Sectiontitle } from '@/app/_components/Text/Sectiontitle'
import {
  Avatar,
  Box,
  Grid,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material'

const Field = ({ label, value }: { label: string; value: string }) => (
  <Box>
    <InputLabel>{label}</InputLabel>
    <Typography>{value}</Typography>
  </Box>
)

export const EditProfileForm = ({
  id,
  name,
  image,
  email,
  location,
  organization,
}: Props) => {
  return (
    <Box>
      <Sectiontitle text='プロフィール' />
      <Grid
        container
        xs={12}
        md={8}
        component='form'
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column-reverse', md: 'row' },
        }}
      >
        <Grid item xs={12} md={8}>
          <Field label='ID' value={id} />
          <Field label='名前' value={name || '未登録'} />
          <Field label='メールアドレス' value={email || '未登録'} />
          <TextField
            fullWidth
            label='居住地'
            defaultValue={location}
            variant='standard'
          />
          <TextField
            fullWidth
            label='所属'
            defaultValue={organization}
            variant='standard'
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar src={image || undefined} sx={{ width: 200, height: 200 }} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
