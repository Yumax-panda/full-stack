'use client'
import { useEffect } from 'react'

import { Box } from '@mui/material'
import { Controller } from 'react-hook-form'

import { Header } from '../Header/Header'
import { useEdit } from '../hooks/useEdit'
import { TitleField } from '../TitleField'

import type { Work } from '@prisma/client'

import { EditorContainer } from '@/app/_components/EditorContainer'
import { Thumbnail } from '@/app/_components/Thumbnail'
import { Tiptap } from '@/app/_components/Tiptap'

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

  // ショートカットキーで保存
  useEffect(() => {
    const saveShortcut = (e: KeyboardEvent) => {
      if (e.key === 's' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onSubmit()
      }
    }
    window.addEventListener('keydown', saveShortcut)
    return () => window.removeEventListener('keydown', saveShortcut)
  }, [])

  return (
    <Box component='form' onSubmit={onSubmit} sx={{ position: 'relative' }}>
      <Header
        workId={work.id}
        isLoading={isLoading}
        isPrivate={isPrivate}
        toggleIsPrivate={toggleIsPrivate}
        onThumbnailAdd={onThumbnailUpload}
      />
      <EditorContainer>
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
              workId={work.id}
              userId={work.userId}
            />
          )}
        />
      </EditorContainer>
    </Box>
  )
}
