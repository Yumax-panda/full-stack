import './Tiptap.css'

import { extensions } from '@/lib/editor/editor'
import { Link } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { EditorContent, useEditor } from '@tiptap/react'
import { forwardRef } from 'react'
import { BubbleMenu } from '../BubbleMenu'
import { EditorMenu } from '../EditorMenu'
import { useBubbleMenu } from '../hooks/useBubbleMenu'
import { useEditorMenu } from '../hooks/useEditorMenu'

type Props = {
  content: string
  // workIdとuserIdはeditableがfalseのとき不要だが、整合性を保つためにundefinedを許容していない
  workId: string
  userId: string
  onChange?: (content: string) => void
  editable?: boolean
}

export const Tiptap = forwardRef<HTMLDivElement | null, Props>(
  ({ content, onChange = () => {}, editable = true, workId, userId }, ref) => {
    const editor = useEditor({
      content,
      onUpdate: ({ editor }) => onChange(editor.getHTML()),
      editable,
      extensions,
      immediatelyRender: true,
    })
    const { setLink } = useBubbleMenu({ editor })
    const { onLinkEmbedAdd, onImageAdd } = useEditorMenu({
      editor,
      workId,
      userId,
    })

    return (
      <div ref={ref}>
        {editor && editable && (
          <BubbleMenu
            editor={editor}
            tippyOptions={{
              placement: 'bottom',
            }}
          >
            <IconButton onClick={setLink}>
              <Link />
            </IconButton>
          </BubbleMenu>
        )}
        {editor && editable && (
          <EditorMenu onLinkEmbedAdd={onLinkEmbedAdd} onImageAdd={onImageAdd} />
        )}
        <EditorContent editor={editor} />
      </div>
    )
  },
)
