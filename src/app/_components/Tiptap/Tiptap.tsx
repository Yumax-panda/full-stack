'use client'

import './Tiptap.css'

import Image from '@tiptap/extension-image' // eslint-disable-line import/no-named-as-default
import Placeholder from '@tiptap/extension-placeholder' // eslint-disable-line import/no-named-as-default
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit' // eslint-disable-line import/no-named-as-default
import Link from '@tiptap/extension-link' // eslint-disable-line import/no-named-as-default

type Props = {
  content: string
  onChange?: (content: string) => void
  editable?: boolean
}

export const Tiptap = ({
  content,
  onChange = () => { },
  editable = true,
}: Props) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Image,
      Placeholder.configure({ placeholder: '制作物の説明を入力しましょう！' }),
      Link
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editable,
  })

  return <EditorContent editor={editor} />
}
