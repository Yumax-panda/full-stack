import { useCallback } from 'react'

import type { Editor } from '@tiptap/react'

import { fetchSiteData } from '@/lib/ogp'

type Props = {
  editor: Editor | null
}

type UseEditorMenuReturn = {
  onLinkEmbedAdd: () => Promise<void>
  onImageAdd: () => void
}

export const useEditorMenu = ({ editor }: Props): UseEditorMenuReturn => {
  const onLinkEmbedAdd = async () => {
    const url = window.prompt('URLを入力してください')
    if (!url) return

    const ogpData = await fetchSiteData(url)
    // FIXME: ここにOGPを埋め込む処理を書く
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

  const onImageAdd = useCallback(() => {
    const url = window.prompt('URLを入力してください')
    if (!url) return
    if (editor) {
      // FIXME: Cloud Storageへアップロードするロジックを追加する
      editor.chain().focus().setImage({ src: url }).blur().run()
    }
  }, [editor])

  return { onLinkEmbedAdd, onImageAdd }
}
