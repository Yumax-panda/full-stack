'use client'

import type { Work } from '@prisma/client'
import { Box } from '@mui/material'
import { EditorContainer } from '@/app/_components/EditorContainer'
import { Title } from '@/app/_components/Text/Title'
import { Thumbnail } from '@/app/_components/Thumbnail'
import { Tiptap } from '@/app/_components/Tiptap'
import { UserCard } from '../UserCard'
import { UserSummary } from '../UserSummary'
import type { ComponentProps } from 'react'

type Props = {
  user: ComponentProps<typeof UserSummary>['user']
} & Pick<Work, 'title' | 'content' | 'thumbnail'>

export const Content = ({ title, content, thumbnail, user }: Props) => (
  <div>
    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr auto' }}>
      <EditorContainer sx={{ m: 0 }}>
        <Title title={title || '無題'} />
        <Thumbnail url={thumbnail} onClick={() => { }} omitDeleteButton />
        <Tiptap content={content || ''} editable={false} />
      </EditorContainer>
      <div style={{ width: '300px' }}>
        <UserCard user={user} />
        {/* TODO: 目次を追加 */}
        <Box sx={{ position: 'sticky', top: '2rem', mt: '2rem' }}>test</Box>
      </div>
    </Box>
    <Box sx={{ borderTop: '1px solid lightgray', pt: '1rem' }}>
      <UserSummary user={user} />
    </Box>
  </div>
)
