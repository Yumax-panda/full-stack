'use client'

import './Tiptap.css'

import { EditorContent, useEditor } from '@tiptap/react'
import { extensions } from '@/lib/editor'

type Props = {
  content: string
  onChange?: (content: string) => void
  editable?: boolean
}

export const Tiptap = ({
  content,
  onChange = () => {},
  editable = true,
}: Props) => {
  const editor = useEditor({
    extensions,
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editable,
  })

  return <EditorContent editor={editor} />
}
