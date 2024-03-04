import type { Editor } from '@tiptap/react'

import { fetchSiteData } from '@/lib/ogp'

type Props = {
  editor: Editor | null
}

type UseEditorMenuReturn = {
  onLinkEmbedAdd: () => Promise<void>
}

export const useEditorMenu = ({ editor }: Props): UseEditorMenuReturn => {
  const onLinkEmbedAdd = async () => {
    const url = window.prompt('URLを入力してください')
    if (!url) return
    try {
      const ogpData = await fetchSiteData(url)
      editor?.commands.insertContent({})
      return
    } catch (e) {
      console.error(e)
      alert('OGPの取得に失敗しました')
    }
  }

  return { onLinkEmbedAdd }
}
