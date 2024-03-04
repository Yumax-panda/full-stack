'use client'

import './Tiptap.css'

import { Button } from '@mui/material'
import { EditorContent, useEditor, BubbleMenu } from '@tiptap/react'

import { useBubbleMenu } from '../hooks/useBubbleMenu'

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
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editable,
    extensions,
  })
  const { setLink } = useBubbleMenu({ editor })

  return (
    <>
      {editor && editable && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{
            placement: 'bottom',
          }}
        >
          <Button onClick={setLink}>リンク</Button>
        </BubbleMenu>
      )}
      <EditorContent editor={editor} />
    </>
  )
}
