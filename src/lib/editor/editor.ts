import Heading from '@tiptap/extension-heading' // eslint-disable-line import/no-named-as-default
import Image from '@tiptap/extension-image' // eslint-disable-line import/no-named-as-default
import Link from '@tiptap/extension-link' // eslint-disable-line import/no-named-as-default
import Placeholder from '@tiptap/extension-placeholder' // eslint-disable-line import/no-named-as-default
import { generateJSON as originalGenerateJSON } from '@tiptap/html'
import StarterKit from '@tiptap/starter-kit' // eslint-disable-line import/no-named-as-default
import { encodeURLSafe } from '../utils'

import Embed from './ext/embed'

export const extensions = [
  StarterKit.configure({
    heading: false,
  }),
  Heading.extend({
    addAttributes() {
      return {
        ...this.parent?.(),
        id: {
          default: null,
          parseHTML: ({ textContent }) => ({
            id: textContent ? encodeURLSafe(textContent) : null,
          }),
          renderHTML: (attributes) => attributes.id,
        },
      }
    },
    // extendした後にconfigureしないとオプションが反映されない
    // ref: https://github.com/ueberdosis/tiptap/blob/main/packages/core/src/Node.ts#L581
  }).configure({
    levels: [1, 2, 3],
  }),
  Image,
  Placeholder.configure({ placeholder: '活動記録の説明を入力しましょう！' }),
  Link.configure({
    autolink: false,
  }),
  Embed,
]

const generateJSON = (html: string) => {
  return originalGenerateJSON(html, extensions)
}

type HeadingType = {
  text: string
  level: number
}

export const getHeadings = (html: string | null): HeadingType[] => {
  if (!html) return []
  const json = generateJSON(html)
  if (typeof json.content !== 'object') return []
  const headings: HeadingType[] = []
  for (const node of json.content) {
    if (node.type === 'heading' && node.content && node.content.length > 0) {
      headings.push({
        text: node.content[0].text,
        level: node.attrs.level,
      })
    }
  }
  return headings
}
