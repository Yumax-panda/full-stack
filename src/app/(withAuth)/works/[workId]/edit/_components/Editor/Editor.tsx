'use client'
import { Controller } from 'react-hook-form'

import { Container } from '@/app/_components/Container/Container'
import { Button } from '@mui/material'

import { useEdit } from '../hooks/useEdit'
import { Tiptap } from '../Tiptap/Tiptap'
import { TitleField } from '../TitleField'

import type { Work } from '@prisma/client'

type Props = {
  work: Work
}

export const Editor = ({ work }: Props) => {
  const { control, onSubmit, formState } = useEdit({ title: work.title, content: work.content })

  return (
    <Container component="form" onSubmit={onSubmit}>
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <TitleField
            {...field}
            placeholder="タイトル"
          />
        )}
      />
      <Controller
        name="content"
        control={control}
        render={({ field }) => (
          <Tiptap
            content={field.value}
            onChange={(content) => field.onChange(content)}
          />
        )}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={!formState.isValid}
      >
        保存
      </Button>
    </Container>
  )
}
