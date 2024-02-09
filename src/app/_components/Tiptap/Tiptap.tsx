'use client'

import './Tiptap.css'

import Image from '@tiptap/extension-image' // eslint-disable-line import/no-named-as-default
import Placeholder from '@tiptap/extension-placeholder' // eslint-disable-line import/no-named-as-default
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit' // eslint-disable-line import/no-named-as-default

import TableOfContents from './ext/TableOfContents'

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
    extensions: [
      StarterKit,
      Image,
      Placeholder.configure({ placeholder: '制作物の説明を入力しましょう！' }),
      TableOfContents,
    ],
    content: `<toc></toc><h1>test</h1>${content}`,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      console.log('html', html)
      onChange(html)
    },
    editable,
  })

  return <EditorContent editor={editor} />
}
