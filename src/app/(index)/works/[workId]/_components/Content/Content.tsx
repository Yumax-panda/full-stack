'use client'

import type { Work } from '@prisma/client'
import { Box } from '@mui/material'
import { EditorContainer } from '@/app/_components/EditorContainer'
import { Title } from '@/app/_components/Text/Title'
import { Thumbnail } from '@/app/_components/Thumbnail'
import { Tiptap } from '@/app/_components/Tiptap'
import { UserSummary } from '../UserSummary'
import type { ComponentProps } from 'react'

type Props = {
  user: ComponentProps<typeof UserSummary>['user']
} & Pick<Work, 'title' | 'content' | 'thumbnail'>

export const Content = ({ title, content, thumbnail, user }: Props) => (
  <Box sx={{ display: 'grid', gridTemplateColumns: '1fr auto' }}>
    <EditorContainer sx={{ m: 0 }}>
      <Title title={title || '無題'} />
      <Thumbnail url={thumbnail} onClick={() => {}} omitDeleteButton />
      <Tiptap content={content || ''} editable={false} />
      <Box sx={{ borderTop: '1px solid lightgray', pt: '1rem' }}>
        <UserSummary user={user} />
      </Box>
    </EditorContainer>
    <div style={{ flexGrow: 1 }}>test</div>
  </Box>
)
