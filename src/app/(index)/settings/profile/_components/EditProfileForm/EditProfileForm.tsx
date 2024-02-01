'use client'
import type { User as Props } from '@prisma/client'
import { SectionTitle } from '@/app/_components/Text/SectionTitle'
import { CorporateFare, Email, LocationOn } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Button,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  InputLabel,
  Typography,
} from '@mui/material'
import { Alert } from '@/app/_components/Alert'

import { updateUserAction } from './action'
import { useServerForm } from '@/app/_components/hooks/useServerForm'

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

  const action = updateUserAction.bind(null, id)
  const {
    formState,
    dispatch,
    status: { pending },
  } = useServerForm({ action, initialState: null })

  return (
    <Box component='form' action={dispatch}>
      <SectionTitle text='プロフィール' />
      <Alert state={formState} />
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
            <Typography sx={readOnlyStyle}>ID: {id}</Typography>
            <Typography sx={readOnlyStyle}>名前: {name}</Typography>
            <Field icon={<Email />} text={email || 'N/A'} />
            <InputLabel htmlFor='location'>居住地</InputLabel>
            <TextField
              id='location'
              name='location'
              fullWidth
              defaultValue={location}
              variant='standard'
              placeholder='Tokyo'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <LocationOn />
                  </InputAdornment>
                ),
              }}
            />
            <InputLabel htmlFor='organization'>所属</InputLabel>
            <TextField
              id='organization'
              fullWidth
              name='organization'
              autoComplete='organization'
              defaultValue={organization}
              variant='standard'
              placeholder='Full Stack Inc.'
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
        <Button variant='contained' type='submit' disabled={pending}>
          更新
        </Button>
      </Box>
    </Box>
  )
}
