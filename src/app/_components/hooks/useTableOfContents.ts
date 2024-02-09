import { useState, useCallback, useEffect } from 'react'
import type { Editor } from '@tiptap/react'

type Heading = {
  level: number
  text: string
  id: string
}

type UseTableOfContentsReturn = {
  headings: Heading[]
}

type Props = {
  editor: Editor | null
}

export const useTableOfContents = ({
  editor,
}: Props): UseTableOfContentsReturn => {
  const [headings, setHeadings] = useState<Heading[]>([])

  const handleUpdate = useCallback(() => {
    if (!editor) {
      return
    }

    const newHeadings: Heading[] = []
    const transaction = editor.state.tr

    editor.state.doc.descendants((node, pos) => {
      if (node.type.name === 'heading') {
        const id = `heading-${newHeadings.length + 1}`

        if (node.attrs.id !== id) {
          transaction.setNodeMarkup(pos, undefined, { ...node.attrs, id })
        }

        newHeadings.push({
          level: node.attrs.level,
          text: node.textContent,
          id,
        })
      }
    })

    transaction.setMeta('addToHistory', false)
    transaction.setMeta('preventUpdate', true)

    editor.view.dispatch(transaction)

    setHeadings(newHeadings)
  }, [editor])

  useEffect(handleUpdate, [])

  useEffect(() => {
    if (!editor) {
      return
    }
    editor.on('update', handleUpdate)

    return () => {
      editor.off('update', handleUpdate)
    }
  }, [editor])

  return { headings }
}
