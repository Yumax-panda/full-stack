import { Box } from '@mui/material'

import { Subtitle } from '../_components/Text/Subtitle/Subtitle'
import { Title } from '../_components/Text/Title'
import { Feature } from './_components/Feature'
import { SignInButton } from './_components/SignInButton'

export default function Home() {
  return (
    <Box>
      <Box sx={{ margin: 'auto', textAlign: 'center' }}>
        <Title title='Full Stack' />
        <Subtitle
          text='エンジニアのためのポートフォリオサイト'
          sx={{ my: '0.5rem' }}
        />
        <SignInButton />
      </Box>
      <Feature />
    </Box>
  )
}
