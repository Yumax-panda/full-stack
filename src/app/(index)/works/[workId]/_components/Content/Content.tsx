'use client'

import type { Work } from '@prisma/client'
import { Title } from '@/app/_components/Text/Title'
import { Thumbnail } from '@/app/_components/Thumbnail'
import { Tiptap } from '@/app/_components/Tiptap'
import { UserSummary } from '../UserSummary'
import type { ComponentProps } from 'react'

type Props = {
  user: ComponentProps<typeof UserSummary>['user']
} & Pick<Work, 'title' | 'content' | 'thumbnail'>

export const Content = ({ title, content, thumbnail, user }: Props) => (
  <div>
    <Title title={title || '無題'} />
    <Thumbnail url={thumbnail} onClick={() => {}} omitDeleteButton />
    <Tiptap content={content || ''} editable={false} />
    <UserSummary user={user} />
  </div>
)
