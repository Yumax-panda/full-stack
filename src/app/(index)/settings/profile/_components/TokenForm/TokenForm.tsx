import type { ArticleToken } from '@prisma/client'
import { Sectiontitle } from '@/app/_components/Text/Sectiontitle'
import { Button, Stack, TextField, Typography } from '@mui/material'

type Props = {
  tokens: ArticleToken[]
  userId: string
}

export const TokenForm = ({ tokens, userId }: Props) => {
  const tokenMap = new Map(tokens.map((token) => [token.provider, token]))
  const getValueFromProvider = (provider: ArticleToken['provider']) =>
    tokenMap.get(provider)?.token || ''

  return (
    <Stack spacing={2} my={'2rem'}>
      <Sectiontitle text='連携' />
      <Typography>Qiita</Typography>
      <TextField
        fullWidth
        variant='standard'
        defaultValue={getValueFromProvider('QIITA')}
        name='QIITA'
        placeholder='Qiitaのトークン'
      />
      <Typography>Zenn</Typography>
      <TextField
        fullWidth
        variant='standard'
        defaultValue={getValueFromProvider('ZENN')}
        name='ZENN'
        placeholder='ZENNのアカウント名'
      />
      <Typography>Note</Typography>
      <TextField
        fullWidth
        variant='standard'
        defaultValue={getValueFromProvider('NOTE')}
        name='NOTE'
        placeholder='Noteのアカウント名'
      />
      <Button
        type='submit'
        variant='contained'
        color='primary'
        sx={{ width: 'fit-content' }}
      >
        保存
      </Button>
    </Stack>
  )
}
