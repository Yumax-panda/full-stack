import type { Work } from '@prisma/client'

import React, { useCallback, useState } from 'react'

import { workImageStorage } from '@/repository/storage'
import Heading from '@tiptap/extension-heading' // eslint-disable-line import/no-named-as-default
import Image from '@tiptap/extension-image' // eslint-disable-line import/no-named-as-default
import Placeholder from '@tiptap/extension-placeholder' // eslint-disable-line import/no-named-as-default
import { useEditor as defaultUseEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit' // eslint-disable-line import/no-named-as-default

import type { Editor } from '@tiptap/react'

type UseEditorReturn = {
  editor: Editor | null
  title: string
  setTitle: (title: string) => void
  thumbnailUrl: string
  handleThumbnailChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  addImage: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>
  save: () => Promise<void>
}

export type Props = Omit<Work, 'createdAt' | 'updatedAt'>

export const useEditor = ({
  id,
  title: initialTitle,
  thumbnail: initialThumbnail,
  content,
  isPrivate,
  pinned,
  userId,
}: Props): UseEditorReturn => {
  const [title, setTitle] = useState<string>(initialTitle ?? '')
  const [thumbnailUrl, setThumbnailUrl] = useState<string>(
    initialThumbnail ?? '',
  )
  const [thumbnailImage, setThumbnailImage] = useState<File | null>(null)

  const editor = defaultUseEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Write something here...',
      }),
      Image,
    ],
    content: content ?? '',
  })

  const save = async () => {}

  const handleThumbnailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        setThumbnailImage(file)
        setThumbnailUrl(URL.createObjectURL(file))
      }
    },
    [],
  )

  const addImage = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        const imageUrl = await workImageStorage.upload({
          userId,
          workId: id,
          file,
        })
        editor?.chain().focus().setImage({ src: imageUrl }).run()
      }
    },
    [editor, id, userId],
  )

  return {
    editor,
    title,
    setTitle,
    thumbnailUrl,
    handleThumbnailChange,
    addImage,
    save,
  }
}
