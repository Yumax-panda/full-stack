import { type ChangeEvent, useCallback } from 'react'

import type { Editor } from '@tiptap/react'

import { client } from '@/lib/client'
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
    // FIXME: データ取得にPOSTは不適切かも...?
    const res = await client.api.embeds.$post({ json: { url } })
    const data = await res.json()

    if (!res.ok || 'error' in data) {
      window.alert('OGPデータの取得に失敗しました')
      return
    }
    // ref: https://github.com/ueberdosis/tiptap/blob/main/packages/extension-youtube/src/youtube.ts
    editor
      ?.chain()
      .setEmbed({
        HTMLAttributes: {},
        ...data,
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
