import type { Skill as SkillPayload, Tag as TagPayload } from '@prisma/client'
import { Star as MuiStar, StarOutline } from '@mui/icons-material'
import { Box, Card, CardContent, CardMedia, Chip, Typography } from '@mui/material'

type StarProps = {
  filled: boolean
}
type Skill = Pick<SkillPayload, 'name' | 'level' | 'image'>
type Tag = Pick<TagPayload, 'name' | 'color'>
type Props = Skill & {
  tags: Tag[]
}

const Star = ({ filled }: StarProps) => {
  const Icon = filled ? MuiStar : StarOutline
  const color = filled ? 'gold' : 'gray'
  return <Icon sx={{ color, height: '2.5rem', width: '2.5rem' }} />
}

const StarField = ({ level }: { level: number }) => {
  const filledStarNum = Math.min(3, Math.max(0, level))
  const stars = Array.from({ length: 3 }, (_, i) => i < filledStarNum)
  return (
    <Box sx={{ display: 'flex' }}>
      {stars.map((filled, i) => (
        <Star key={i} filled={filled} />
      ))}
    </Box>
  )
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
      sx={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', margin: 'auto' }}
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
