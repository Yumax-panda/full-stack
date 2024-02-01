'use client'

import type { Work as Props } from '@prisma/client'
import { Title } from '@/app/_components/Text/Title'
import { Thumbnail } from '@/app/_components/Thumbnail'
import { Tiptap } from '@/app/_components/Tiptap'

export const Content = ({ title, content, thumbnail }: Props) => (
  <div>
    <Title title={title || ''} />
    <Thumbnail url={thumbnail} onClick={() => {}} omitDeleteButton />
    <Tiptap content={content || ''} editable={false} />
  </div>
)
