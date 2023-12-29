'use client'
import './Editor.css'

import { EditorContent } from '@tiptap/react'

import { useEditor } from '../hooks/useEditor'

type Props = {
  initialContent?: string
  workId: string
}

export const Editor = (props: Props) => {
  const { editor } = useEditor(props)

  return <EditorContent editor={editor} />
}
