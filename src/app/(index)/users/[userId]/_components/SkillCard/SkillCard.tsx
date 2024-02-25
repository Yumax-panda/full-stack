import { QuestionMark } from '@mui/icons-material'
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material'

import type { Skill as SkillPayload, Tag as TagPayload } from '@prisma/client'

import { StarField } from '@/app/(index)/_components/StarField'
import { Tag } from '@/app/(index)/_components/Tag'

type Skill = Pick<SkillPayload, 'name' | 'level' | 'image'>
type Tag = Pick<TagPayload, 'name' | 'color' | 'brief'>
export type Props = Skill & {
  tags: Tag[]
}

export const SkillCard = ({ name, level, image, tags = [] }: Props) => {
  const cardStyle = {
    width: '6rem',
    height: '6rem',
    flexShrink: 0,
    margin: 'auto',
  } as const

  return (
    <Card
      sx={{ display: 'flex', flexDirection: 'column', padding: '1rem' }}
      raised
    >
      <Box sx={{ display: 'flex' }}>
        {image ? (
          <CardMedia image={image} sx={cardStyle} />
        ) : (
          <QuestionMark
            sx={{
              ...cardStyle,
              color: 'lightgray',
              bgcolor: 'rgba(0, 0, 0, 0.04)',
              borderRadius: '1.5rem',
            }}
          />
        )}
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography
            sx={{
              fontSize: '1.4rem',
              fontWeight: 'bold',
              color: 'rgba(0, 0, 0, 0.87)',
            }}
          >
            {name}
          </Typography>
          <StarField level={level} />
        </CardContent>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          margin: 'auto',
          height: '2rem',
        }}
      >
        {tags.map((tag) => (
          <Tag key={tag.name} {...tag} />
        ))}
      </Box>
    </Card>
  )
}
