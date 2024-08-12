/**
 * MIT License

Copyright (c) 2023 azukiazusa1

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */

import { type RefObject, useEffect, useRef } from 'react'
import { ACTIVE_CLASS } from '../utils/constants'
import { getTocId } from '../utils/id'
import styles from './effect.module.css'

type Props = {
  headingTexts: string[]
}

type UseContentReturn = {
  tocRef: RefObject<HTMLUListElement | null>
  editorRef: RefObject<HTMLDivElement | null>
}

const CSS_MODULE_ACTIVE = styles[ACTIVE_CLASS]

export const useContent = ({ headingTexts }: Props): UseContentReturn => {
  const tocRef = useRef<HTMLUListElement | null>(null)
  const editorRef = useRef<HTMLDivElement | null>(null)

  // biome-ignore lint: 依存関係を持たないため.
  useEffect(() => {
    if (!tocRef.current || !editorRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || !tocRef.current) return

          // Viewport内に入ったheadingのidを取得
          const activeTocId = getTocId(entry.target.id)

          // 目次のリンク内で該当する見出しを変更
          for (const text of headingTexts) {
            const tocId = getTocId(text)
            const elem = tocRef.current.querySelector(`#${tocId}`)

            if (elem) {
              if (activeTocId === tocId) {
                elem.classList.add(CSS_MODULE_ACTIVE)
              } else {
                elem.classList.remove(CSS_MODULE_ACTIVE)
              }
            }
          }
        }
      },
      {
        rootMargin: '-1px 0px -90% 0px',
      },
    )

    for (const text of headingTexts) {
      const headingElem = editorRef.current.querySelector(`#${text}`)

      if (headingElem) {
        observer.observe(headingElem)
      }
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return { tocRef, editorRef }
}
