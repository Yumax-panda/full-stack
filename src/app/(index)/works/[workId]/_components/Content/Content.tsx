import type { ComponentProps } from 'react'

import { Box } from '@mui/material'

import { TableOfContents } from '../TableOfContents'
import { UserCard } from '../UserCard'
import { UserSummary } from '../UserSummary'

import type { Work } from '@prisma/client'

import { EditorContainer } from '@/app/_components/EditorContainer'
import { Title } from '@/app/_components/Text/Title'
import { Thumbnail } from '@/app/_components/Thumbnail'
import { Tiptap } from '@/app/_components/Tiptap'
import { getHeadings } from '@/lib/editor/editor'

type Props = {
  user: ComponentProps<typeof UserSummary>['user']
} & Pick<Work, 'title' | 'content' | 'thumbnail'>

export const Content = ({ title, content, thumbnail, user }: Props) => (
  <div>
    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr auto' }}>
      <EditorContainer sx={{ m: { xs: 'auto', lg: 0 } }}>
        <Title title={title || '無題'} />
        <Thumbnail url={thumbnail} omitDeleteButton />
        <Tiptap content={content || ''} editable={false} />
      </EditorContainer>
      <Box sx={{ width: '300px', display: { xs: 'none', lg: 'initial' } }}>
        <UserCard user={user} />
        <Box sx={{ position: 'sticky', top: '2rem', mt: '2rem' }}>
          <TableOfContents headings={getHeadings(content)} />
        </Box>
      </Box>
    </Box>
    <Box sx={{ borderTop: '1px solid lightgray', pt: '1rem' }}>
      <UserSummary user={user} />
    </Box>
  </div>
)
