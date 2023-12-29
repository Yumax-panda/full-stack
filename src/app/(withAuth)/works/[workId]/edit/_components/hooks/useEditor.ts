import Placeholder from '@tiptap/extension-placeholder'
import { useEditor as defaultUseEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import type { Editor } from '@tiptap/react'

type Props = {
  initialContent?: string
  workId: string
}

type UseEditorReturn = {
  editor: Editor | null
}

export const useEditor = ({ initialContent = '' }: Props): UseEditorReturn => {
  const editor = defaultUseEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Write something here...',
      }),
    ],
    content: initialContent,
  })

  return { editor }
}
