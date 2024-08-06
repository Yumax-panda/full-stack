'use client'

import { Button, InputLabel, Stack, TextField } from '@mui/material'

import { SectionTitle } from '@/app/_components/Text/SectionTitle'
import type { ArticleToken } from '@prisma/client'
import { useTokenForm } from '../hooks/useTokenForm'

type Props = {
  tokens: ArticleToken[]
}

export const TokenForm = ({ tokens }: Props) => {
  const tokenMap = new Map(tokens.map((token) => [token.provider, token]))
  const getValueFromProvider = (provider: ArticleToken['provider']) =>
    tokenMap.get(provider)?.token || ''

  const { isLoading, handleSubmit, register } = useTokenForm({
    qiita: getValueFromProvider('QIITA'),
    zenn: getValueFromProvider('ZENN'),
    note: getValueFromProvider('NOTE'),
  })

  return (
    <Stack spacing={2} my={'2rem'} component='form' onSubmit={handleSubmit}>
      <SectionTitle text='連携' />
      <InputLabel htmlFor='qiita'>QiitaのAPIトークン</InputLabel>
      <TextField
        id='qiita'
        fullWidth
        variant='standard'
        placeholder='abcde12345'
        {...register('qiita')}
      />
      <InputLabel htmlFor='zenn'>ZENNのアカウント名</InputLabel>
      <TextField
        id='zenn'
        fullWidth
        variant='standard'
        placeholder='zenn_account'
        {...register('zenn')}
      />
      <InputLabel htmlFor='note'>Noteのアカウント名</InputLabel>
      <TextField
        id='note'
        fullWidth
        variant='standard'
        placeholder='note_account'
        {...register('note')}
      />
      <Button
        type='submit'
        variant='contained'
        color='primary'
        sx={{ width: 'fit-content' }}
        disabled={isLoading}
      >
        保存
      </Button>
    </Stack>
  )
}
