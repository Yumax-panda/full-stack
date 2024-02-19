import Image from '@tiptap/extension-image' // eslint-disable-line import/no-named-as-default
import Placeholder from '@tiptap/extension-placeholder' // eslint-disable-line import/no-named-as-default
import StarterKit from '@tiptap/starter-kit' // eslint-disable-line import/no-named-as-default
import { generateJSON as originalGenerateJSON } from '@tiptap/html'

export const extensions = [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3],
    },
  }),
  Image,
  Placeholder.configure({ placeholder: '制作物の説明を入力しましょう！' }),
]

export const generateJSON = (html: string) => {
  return originalGenerateJSON(html, extensions)
}

type Heading = {
  text: string
  level: number
}

export const getHeadings = (html: string | null): Heading[] => {
  if (!html) return []
  const json = generateJSON(html)
  if (typeof json.content !== 'object') return []
  const headings: Heading[] = []
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
