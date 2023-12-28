import type { Skill as SkillPayload, Tag as TagPayload } from '@prisma/client'
import { Box, Card, CardContent, CardMedia, Chip, Typography } from '@mui/material'

type Skill = Pick<SkillPayload, 'name' | 'level' | 'image'>
type Tag = Pick<TagPayload, 'name' | "color">

type Props = Skill & {
  tags: Tag[]
}

export const SkillCard = ({ name, level, image, tags = [] }: Props) => (
  <Card sx={{ display: "flex", flexDirection: "column", padding: "1rem" }}>
    <Box sx={{ display: "flex" }}>
      <CardMedia
        sx={{
          width: "6rem",
          height: "6rem",
          flexShrink: 0,
          margin: "auto",
        }}
        image={image || undefined}
        title={name}
      />
      <CardContent sx={{ flex: "1 0 auto" }}>
        <Typography
          sx={{
            fontSize: '1.4rem',
            fontWeight: 'bold',
            color: 'rgba(0, 0, 0, 0.87)',
          }}
        >
          {name}
        </Typography>
        <Typography
          sx={{
            fontSize: '1.2rem',
            lineHeight: '2rem',
          }}
        >
          {level}
        </Typography>
      </CardContent>
    </Box>
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", margin: "auto" }}>
      {tags.map(tag => (
        <Chip
          key={tag.name}
          label={tag.name}
          sx={{
            backgroundColor: tag.color,
            color: "white"
          }}
        />
      ))}
    </Box>
  </Card>
)