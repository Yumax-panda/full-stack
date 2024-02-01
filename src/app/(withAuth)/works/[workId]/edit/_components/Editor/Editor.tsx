'use client'
import { Controller } from 'react-hook-form'

import { Container } from '@/app/_components/Container/Container'
import { Thumbnail } from '@/app/_components/Thumbnail'
import { Tiptap } from '@/app/_components/Tiptap/Tiptap'
import { Box } from '@mui/material'

import { Header } from '../Header/Header'
import { useEdit } from '../hooks/useEdit'
import { TitleField } from '../TitleField'

import type { Work } from '@prisma/client'

type Props = {
  work: Work
}

export const Editor = ({ work }: Props) => {
  const {
    control,
    onSubmit,
    isLoading,
    isPrivate,
    toggleIsPrivate,
    onThumbnailUpload,
    thumbnail,
    onThumbnailRemove,
  } = useEdit(work)

  return (
    <Box component='form' onSubmit={onSubmit}>
      <Header
        isLoading={isLoading}
        workId={work.id}
        isPrivate={isPrivate}
        toggleIsPrivate={toggleIsPrivate}
        onThumbnailAdd={onThumbnailUpload}
      />
      <Container>
        <Controller
          name='title'
          control={control}
          render={({ field: { value, ...rest } }) => (
            <TitleField value={value ?? ''} placeholder='タイトル' {...rest} />
          )}
        />
        <Box sx={{ display: 'flex' }}>
          <Thumbnail url={thumbnail} onClick={onThumbnailRemove} />
        </Box>
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
