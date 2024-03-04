import type { Editor } from '@tiptap/react'

type Props = {
  editor: Editor | null
}

type UseBubbleMenuReturn = {
  setLink: () => void
}

export const useBubbleMenu = ({ editor }: Props): UseBubbleMenuReturn => {
  const setLink = () => {
    const previous = editor?.getAttributes('link').href
    const url = window.prompt('URLを入力してください', previous)
    if (!url) return editor?.chain().focus().unsetLink().blur().run()
    editor
      ?.chain()
      .focus()
      .extendMarkRange('link')
      // SEO対策
      // ref: https://zenn.dev/team_zenn/articles/2060cd717894cfa7a0c4#1.-%E3%83%AA%E3%83%B3%E3%82%AF%E3%81%AE%E6%82%AA%E7%94%A8%E3%82%92%E9%98%B2%E3%81%90
      .setLink({ href: url, rel: 'nofollow' })
      // focusを解除
      .blur()
      .run()
  }

  return { setLink }
}
