'use client'
import { Controller } from 'react-hook-form'

import { Container } from '@/app/_components/Container/Container'
import { Box } from '@mui/material'

import { Header } from '../Header/Header'
import { useEdit } from '../hooks/useEdit'
import { Thumbnail } from '../Thumbnail'
import { Tiptap } from '../Tiptap/Tiptap'
import { TitleField } from '../TitleField'

import type { Work } from '@prisma/client'

type Props = {
  work: Work
}

export const Editor = ({ work }: Props) => {
  const { control, onSubmit, formState, isPrivate, toggleIsPrivate } =
    useEdit(work)

  return (
    <Box component='form' onSubmit={onSubmit}>
      <Header isPrivate={isPrivate} toggleIsPrivate={toggleIsPrivate} />
      <Container>
        <Controller
          name='title'
          control={control}
          render={({ field: { value, ...rest } }) => (
            <TitleField value={value ?? ''} placeholder='タイトル' {...rest} />
          )}
        />
        <Controller
          name='content'
          control={control}
          render={({ field: { value, ...rest } }) => (
            <Tiptap
              content={value ?? ''}
              onChange={(content) => rest.onChange(content)}
            />
          )}
        />
      </Container>
    </Box>
  )
}
