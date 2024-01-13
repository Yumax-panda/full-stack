import type { User as Props } from '@prisma/client'
import { Sectiontitle } from '@/app/_components/Text/Sectiontitle'
import { CorporateFare, Email, LocationOn } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Button,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material'

type FieldProps = {
  icon: React.ReactNode
  text: string
}

const Field = ({ icon, text }: FieldProps) => (
  <Box sx={{ display: 'flex' }}>
    <Box sx={{ mr: '0.5rem' }}>{icon}</Box>
    <Typography>{text}</Typography>
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
  const readOnlyStyle = {
    textAlign: 'left',
  } as const

  return (
    <Box component='form'>
      <Sectiontitle text='プロフィール' />
      <Grid
        container
        xs={12}
        md={8}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column-reverse', md: 'row' },
          mt: '1rem',
        }}
      >
        <Grid item xs={12} md={8}>
          <Stack spacing={2}>
            <Typography sx={readOnlyStyle}>ID: {id}</Typography>
            <Typography sx={readOnlyStyle}>名前: {name}</Typography>
            <Field icon={<Email />} text={email || 'N/A'} />
            <TextField
              fullWidth
              label='居住地'
              defaultValue={location}
              variant='standard'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <LocationOn />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label='所属'
              defaultValue={organization}
              variant='standard'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <CorporateFare />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar src={image || undefined} sx={{ width: 200, height: 200 }} />
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: '2rem' }}>
        <Button variant='contained' type='submit'>
          更新
        </Button>
      </Box>
    </Box>
  )
}
