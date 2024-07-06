'use client'

import './Tiptap.css'

import { Link } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { isTextSelection } from '@tiptap/core'
import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react'

import { EditorMenu } from '../EditorMenu'
import { useBubbleMenu } from '../hooks/useBubbleMenu'
import { useEditorMenu } from '../hooks/useEditorMenu'

import { extensions } from '@/lib/editor/editor'

type Props = {
  content: string
  // workIdとuserIdはeditableがfalseのとき不要だが、整合性を保つためにundefinedを許容していない
  workId: string
  userId: string
  onChange?: (content: string) => void
  editable?: boolean
}

export const Tiptap = ({
  content,
  onChange = () => {},
  editable = true,
  workId,
  userId,
}: Props) => {
  const editor = useEditor({
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editable,
    extensions,
  })
  const { setLink } = useBubbleMenu({ editor })
  const { onLinkEmbedAdd, onImageAdd } = useEditorMenu({
    editor,
    workId,
    userId,
  })

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

            const ignoredNodes = ['heading', 'image', 'embed']

            return (
              !ignoredNodes.some((v) => editor.isActive(v)) && isRangeSelected
            )
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
    </>
  )
}
