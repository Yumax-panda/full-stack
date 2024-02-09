import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react'
import { TableOfContents } from '../../TableOfContents'
import { useTableOfContents } from '../../hooks/useTableOfContents'
import type { Editor } from '@tiptap/react'

type Props = {
  editor: Editor | null
}

export default Node.create({
  name: 'tableOfContents',
  group: 'block',
  atom: true,
  parseHTML() {
    return [
      {
        tag: 'toc',
      },
    ]
  },
  renderHTML({ HTMLAttributes }) {
    return ['toc', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return ReactNodeViewRenderer(({ editor }: Props) => {
      const { headings } = useTableOfContents({ editor })

      return (
        <NodeViewWrapper className='toc'>
          <TableOfContents headings={headings} />
        </NodeViewWrapper>
      )
    })
  },

  addGlobalAttributes() {
    return [
      {
        types: ['heading'],
        attributes: {
          id: {
            default: null,
          },
        },
      },
    ]
  },
})
