'use client'

import { SectionTitle } from '@/app/_components/Text/SectionTitle'
import { translateError } from '@/models/user'
import {
  BadgeOutlined,
  CorporateFare,
  Email,
  LocationOn,
} from '@mui/icons-material'
import {
  Avatar,
  Box,
  Button,
  Grid,
  InputAdornment,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import type { User as Props } from '@prisma/client'
import { useEditProfileForm } from '../hooks/useEditProfileForm'

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
  bio,
}: Props) => {
  const { isLoading, handleSubmit, register, errors } = useEditProfileForm({
    name,
    location,
    organization,
    bio,
  })

  return (
    <Box component='form' onSubmit={handleSubmit}>
      <SectionTitle text='プロフィール' />
      <Grid
        container
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column-reverse', md: 'row' },
          mt: '1rem',
        }}
      >
        <Grid item xs={12} md={8}>
          <Stack spacing={2}>
            <Typography sx={{ textAlign: 'left' }}>ID: {id}</Typography>
            <Field icon={<Email />} text={email || 'N/A'} />
            <InputLabel htmlFor='name'>名前</InputLabel>
            <TextField
              {...register('name')}
              id='name'
              fullWidth
              variant='standard'
              placeholder='John Doe'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <BadgeOutlined />
                  </InputAdornment>
                ),
              }}
              helperText={translateError(errors?.name?.message)}
              error={!!errors?.name?.message}
            />
            <InputLabel htmlFor='location'>居住地</InputLabel>
            <TextField
              {...register('location')}
              id='location'
              fullWidth
              variant='standard'
              placeholder='Tokyo'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <LocationOn />
                  </InputAdornment>
                ),
              }}
              helperText={translateError(errors?.location?.message)}
              error={!!errors?.location}
            />
            <InputLabel htmlFor='organization'>所属</InputLabel>
            <TextField
              {...register('organization')}
              id='organization'
              fullWidth
              autoComplete='organization'
              variant='standard'
              placeholder='Full Stack Inc.'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <CorporateFare />
                  </InputAdornment>
                ),
              }}
              helperText={translateError(errors?.organization?.message)}
              error={!!errors?.organization}
            />
            <InputLabel htmlFor='bio'>自己紹介</InputLabel>
            <TextField
              {...register('bio')}
              id='bio'
              fullWidth
              multiline
              rows={2}
              variant='standard'
              placeholder='Developer'
              helperText={translateError(errors?.bio?.message)}
              error={!!errors?.bio}
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
        <Button variant='contained' type='submit' disabled={isLoading}>
          更新
        </Button>
      </Box>
    </Box>
  )
}
