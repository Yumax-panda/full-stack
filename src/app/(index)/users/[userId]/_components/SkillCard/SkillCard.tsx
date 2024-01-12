import { StarField } from '@/app/(index)/_components/StarField'
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from '@mui/material'

import type { Skill as SkillPayload, Tag as TagPayload } from '@prisma/client'

type Skill = Pick<SkillPayload, 'name' | 'level' | 'image'>
type Tag = Pick<TagPayload, 'name' | 'color'>
export type Props = Skill & {
  tags: Tag[]
}

export const SkillCard = ({ name, level, image, tags = [] }: Props) => (
  <Card sx={{ display: 'flex', flexDirection: 'column', padding: '1rem' }}>
    <Box sx={{ display: 'flex' }}>
      <CardMedia
        sx={{
          width: '6rem',
          height: '6rem',
          flexShrink: 0,
          margin: 'auto',
        }}
        image={image || undefined}
        title={name}
      />
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
        <Chip
          key={tag.name}
          label={tag.name}
          sx={{
            backgroundColor: tag.color,
            color: 'white',
          }}
        />
      ))}
    </Box>
  </Card>
)
