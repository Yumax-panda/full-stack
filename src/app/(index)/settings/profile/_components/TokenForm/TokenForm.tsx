'use client'

import type { ArticleToken } from '@prisma/client'
import { SectionTitle } from '@/app/_components/Text/SectionTitle'
import { Button, Stack, TextField, Typography } from '@mui/material'
import { useServerForm } from '@/app/_components/hooks/useServerForm'
import { Alert } from '@/app/_components/Alert'
import { InputLabel } from '@mui/material'

import { updateTokenAction } from './action'

type Props = {
  tokens: ArticleToken[]
  userId: string
}

export const TokenForm = ({ tokens, userId }: Props) => {
  const tokenMap = new Map(tokens.map((token) => [token.provider, token]))
  const getValueFromProvider = (provider: ArticleToken['provider']) =>
    tokenMap.get(provider)?.token || ''
  const action = updateTokenAction.bind(null, userId)
  const {
    formState,
    status: { pending },
    dispatch,
  } = useServerForm({ action, initialState: null })

  return (
    <Stack spacing={2} my={'2rem'} component='form' action={dispatch}>
      <SectionTitle text='連携' />
      <Alert state={formState} />
      <InputLabel htmlFor='qiita'>QiitaのAPIトークン</InputLabel>
      <TextField
        id='qiita'
        fullWidth
        variant='standard'
        defaultValue={getValueFromProvider('QIITA')}
        name='QIITA'
        placeholder='abcde12345'
      />
      <InputLabel htmlFor='zenn'>ZENNのアカウント名</InputLabel>
      <TextField
        id='zenn'
        fullWidth
        variant='standard'
        defaultValue={getValueFromProvider('ZENN')}
        name='ZENN'
        placeholder='zenn_account'
      />
      <InputLabel htmlFor='note'>Noteのアカウント名</InputLabel>
      <TextField
        id='note'
        fullWidth
        variant='standard'
        defaultValue={getValueFromProvider('NOTE')}
        name='NOTE'
        placeholder='note_account'
      />
      <Button
        type='submit'
        variant='contained'
        color='primary'
        sx={{ width: 'fit-content' }}
        disabled={pending}
      >
        保存
      </Button>
    </Stack>
  )
}
