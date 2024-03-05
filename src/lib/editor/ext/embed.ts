// ref: https://tiptap.dev/docs/editor/guide/custom-extensions
// ref: https://github.com/ueberdosis/tiptap/blob/main/packages/extension-youtube/src/youtube.ts

import { Node, mergeAttributes } from '@tiptap/core'

export interface EmbedOptions {
  HTMLAttributes: Record<string, any>
}

type SetEmbedOptions = {
  HTMLAttributes: Record<string, any>
  siteName: string
  url: string
  favicon: string
  title: string
  image: string
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    embed: {
      /**
       * Set an embed node
       */
      setEmbed: (options: SetEmbedOptions) => ReturnType
    }
  }
}

const Embed = Node.create<EmbedOptions>({
  name: 'embed',

  inline: false,
  group: 'block',

  addOptions: () => ({ HTMLAttributes: {} }),
  addAttributes() {
    return {
      url: {
        default: null,
      },
      siteName: {
        default: null,
      },
      favicon: {
        default: null,
      },
      title: {
        default: null,
      },
      image: {
        default: null,
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'a[data-embed]',
        getAttrs: (dom) => {
          const a = dom as HTMLAnchorElement
          return {
            url: a.href,
            siteName: a.querySelector('.siteName')?.textContent,
            favicon: a.querySelector('.favicon')?.getAttribute('src'),
            title: a.querySelector('.title')?.textContent,
            image: a.querySelector('img')?.getAttribute('src'),
          }
        },
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    const { url, siteName, favicon, title, image } = HTMLAttributes
    return [
      'a',
      mergeAttributes(this.options.HTMLAttributes, {
        href: url,
        target: '_blank',
        rel: 'noopener noreferrer nofollow',
        class: 'embed-link',
        'data-embed': '',
      }),
      [
        'div',
        { class: 'content' },
        ['div', { class: 'title' }, title],
        [
          'div',
          { class: 'meta' },
          ['img', { src: favicon, alt: siteName, class: 'favicon' }],
          ['div', { class: 'siteName' }, siteName],
        ],
        ['img', { src: image, alt: siteName }],
      ],
    ]
  },

  addCommands() {
    return {
      setEmbed:
        (options: SetEmbedOptions) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          })
        },
    }
  },
})

export default Embed
