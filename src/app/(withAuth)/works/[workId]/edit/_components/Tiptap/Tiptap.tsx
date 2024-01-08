import './Tiptap.css'

import { Box } from '@mui/material'
import Image from '@tiptap/extension-image' // eslint-disable-line import/no-named-as-default
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit' // eslint-disable-line import/no-named-as-default

type Props = {
  content: string
  onChange: (content: string) => void
}

export const Tiptap = ({ content, onChange }: Props) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  return (
    <Box sx={{ minHeight: "80vh" }}>
      <EditorContent editor={editor} />
    </Box>
  )
}