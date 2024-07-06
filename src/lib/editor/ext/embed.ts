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
        tag: 'div[data-embed]',
        getAttrs: (dom) => {
          // NOTE: dom instanceof HTMLElement はnode.jsランタイムで未定義のエラーになるため、typeofで型ガードする
          if (typeof dom === 'string') {
            return null
          }
          return {
            url: dom.querySelector('a')?.getAttribute('href'),
            siteName: dom.querySelector('.site-name')?.textContent,
            favicon: dom.querySelector('.favicon')?.getAttribute('src'),
            title: dom.querySelector('.title')?.textContent,
            image: dom.querySelector('.thumbnail')?.getAttribute('src'),
          }
        },
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    const { url, siteName, favicon, title, image } = HTMLAttributes
    /**
     * <div data-embed>
     *  <a href="url" target="_blank" rel="noopener noreferrer nofollow" class="embed-link">
     *   <div class="content">
     *     <div class="title-wrapper">
     *        <div class="title">title</div>
     *      </div>
     *     <div class="meta">
     *       <img src="favicon" alt="siteName" class="favicon">
     *       <div class="site-name">siteName</div>
     *     </div>
     *    </div>
     *    <img src="image" alt="siteName" class="thumbnail">
     *  </a>
     * </div>
     */
    return [
      'div',
      { 'data-embed': '' },
      [
        'a',
        mergeAttributes(this.options.HTMLAttributes, {
          href: url,
          target: '_blank',
          rel: 'noopener noreferrer nofollow',
          class: 'embed-link',
        }),
        [
          'div',
          { class: 'content' },
          [
            'div',
            { class: 'title-wrapper' },
            ['div', { class: 'title' }, title],
          ],
          [
            'div',
            { class: 'meta' },
            ['img', { src: favicon, alt: siteName, class: 'favicon' }],
            ['div', { class: 'site-name' }, siteName],
          ],
        ],
        ['img', { src: image, alt: siteName, class: 'thumbnail' }],
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
