'use client'

import { Link } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { isTextSelection } from '@tiptap/core'
import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react'

import { EditorMenu } from './EditorMenu'

import type { Action } from './types'

type EditableProps = {
  onContentUpdate: (content: string) => void
  editable: true
  actions?: Action[]
}

type NonEditableProps = {
  onContentUpdate?: never
  actions?: never
  editable: false
}

type Props = {
  content: string
} & (EditableProps | NonEditableProps)

export const EditorBase = ({ content, ...rest }: Props) => {
  const onContentUpdate = rest.onContentUpdate ?? (() => {})

  const editor = useEditor({
    content,
    onUpdate: ({ editor }) => onContentUpdate(editor.getHTML()),
    editable: rest.editable,
  })

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

  return (
    <>
      {editor && (
        <>
          {editor.isEditable && (
            <BubbleMenu
              editor={editor}
              tippyOptions={{
                placement: 'bottom',
              }}
              shouldShow={({ view, state, from, to }) => {
                const { doc, selection } = state
                const { empty } = selection

                const isEmptyTextBlock =
                  !doc.textBetween(from, to).length &&
                  isTextSelection(state.selection)

                const element = document.querySelector('.ProseMirror')
                const isChildOfMenu = !!element?.contains(
                  document.activeElement,
                )

                const hasEditorFocus = view.hasFocus() || isChildOfMenu

                const isRangeSelected =
                  hasEditorFocus &&
                  !empty &&
                  !isEmptyTextBlock &&
                  editor.isEditable

                const ignoredNodes = ['heading', 'image', 'embed']

                return (
                  !ignoredNodes.some((v) => editor.isActive(v)) &&
                  isRangeSelected
                )
              }}
            >
              <IconButton onClick={setLink}>
                <Link />
              </IconButton>
            </BubbleMenu>
          )}
          {editor.isEditable && rest.actions?.length && (
            <EditorMenu actions={rest.actions} />
          )}
          <EditorContent editor={editor} />
        </>
      )}
    </>
  )
}
