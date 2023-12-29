'use client'
import './Editor.css'

import { EditorContent } from '@tiptap/react'

import { useEditor } from '../hooks/useEditor'

import type { Props as WorkPayload } from '../hooks/useEditor'

type Props = {
  work: WorkPayload
}

export const Editor = ({ work }: Props) => {
  const { editor } = useEditor(work)

  return <EditorContent editor={editor} />
}
