'use client'
import { Controller } from 'react-hook-form'

import { Container } from '@/app/_components/Container/Container'
import { Box } from '@mui/material'

import { Header } from '../Header/Header'
import { useEdit } from '../hooks/useEdit'
import { SaveButton } from '../SaveButton'
import { Tiptap } from '../Tiptap/Tiptap'
import { TitleField } from '../TitleField'

import type { Work } from '@prisma/client'

type Props = {
  work: Work
}

export const Editor = ({ work }: Props) => {
  const { control, onSubmit, formState } = useEdit({
    title: work.title,
    content: work.content,
  })

  return (
    <Box component='form' onSubmit={onSubmit}>
      <Header />
      <Container>
        <Controller
          name='title'
          control={control}
          render={({ field }) => (
            <TitleField {...field} placeholder='タイトル' />
          )}
        />
        <Controller
          name='content'
          control={control}
          render={({ field }) => (
            <Tiptap
              content={field.value}
              onChange={(content) => field.onChange(content)}
            />
          )}
        />
      </Container>
    </Box>
  )
}
