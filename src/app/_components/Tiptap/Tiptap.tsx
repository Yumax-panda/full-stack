'use client'

import './Tiptap.css'

import { Link } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { isTextSelection } from '@tiptap/core'
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
          // Headingは非表示
          // ref: https://github.com/ueberdosis/tiptap/blob/main/packages/extension-bubble-menu/src/bubble-menu-plugin.ts#L47
          shouldShow={({ view, state, from, to }) => {
            const { doc, selection } = state
            const { empty } = selection

            const isEmptyTextBlock =
              !doc.textBetween(from, to).length &&
              isTextSelection(state.selection)

            const element = document.querySelector('.ProseMirror')
            const isChildOfMenu = !!element?.contains(document.activeElement)

            const hasEditorFocus = view.hasFocus() || isChildOfMenu

            const isRangeSelected =
              hasEditorFocus && !empty && !isEmptyTextBlock && editor.isEditable

            return !editor.isActive('heading') && isRangeSelected
          }}
        >
          <IconButton onClick={setLink}>
            <Link />
          </IconButton>
        </BubbleMenu>
      )}
      <EditorContent editor={editor} />
    </>
  )
}
