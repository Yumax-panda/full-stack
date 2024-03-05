import { ChangeEvent, useCallback } from 'react'

import type { Editor } from '@tiptap/react'

import { workImageStorage } from '@/repository/storage'

type Props = {
  editor: Editor | null
  workId: string
  userId: string
}

type UseEditorMenuReturn = {
  onLinkEmbedAdd: () => Promise<void>
  onImageAdd: (e: ChangeEvent<HTMLInputElement>) => Promise<void>
}

export const useEditorMenu = ({
  editor,
  workId,
  userId,
}: Props): UseEditorMenuReturn => {
  const onLinkEmbedAdd = async () => {
    const url = window.prompt('URLを入力してください')
    if (!url) return
    const encodedUrl = encodeURIComponent(url)
    const apiUrl = `/api/embed?url=${encodedUrl}`
    const ogpData = await fetch(apiUrl).then((res) => res.json())
    const { error } = ogpData
    if (error) {
      window.alert('OGPデータの取得に失敗しました')
      return
    }
    // ref: https://github.com/ueberdosis/tiptap/blob/main/packages/extension-youtube/src/youtube.ts
    editor
      ?.chain()
      .setEmbed({
        HTMLAttributes: {},
        siteName: ogpData.siteName || '',
        url: ogpData.url,
        favicon: ogpData.favicon || '',
        title: ogpData.title || '',
        image: ogpData.image || '',
      })
      .run()
    return
  }

  const onImageAdd = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return
      try {
        const url = await workImageStorage.upload({
          file,
          userId,
          workId,
        })
        editor?.chain().setImage({ src: url }).run()
      } catch (error) {
        console.error(error)
        window.alert('画像のアップロードに失敗しました')
      }
    },
    [editor, workId, userId],
  )

  return { onLinkEmbedAdd, onImageAdd }
}
