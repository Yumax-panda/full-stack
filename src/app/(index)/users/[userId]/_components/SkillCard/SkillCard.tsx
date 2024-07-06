import { QuestionMark } from '@mui/icons-material'
import { Avatar, Box, Grid, Paper, Rating, Typography } from '@mui/material'

import type { Skill as SkillPayload, Tag as TagPayload } from '@prisma/client'

import { Tag } from '@/app/(index)/_components/Tag'

type Skill = Pick<SkillPayload, 'name' | 'level' | 'image'>
type Tag = Pick<TagPayload, 'name' | 'color' | 'brief' | 'id'>
export type Props = Skill & {
  tags: Tag[]
}

export const SkillCard = ({ name, level, image, tags = [] }: Props) => {
  const cardStyle = {
    marginX: 'auto',
    width: '72px',
    height: '72px',
    objectFit: 'contain',
    borderRadius: '0.5rem',
  } as const

  return (
    <Paper
      sx={{
        borderRadius: '0.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '1rem 0.5rem',
        py: '0.5rem',
      }}
    >
      <Grid
        container
        sx={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Grid item xs={4}>
          {image ? (
            <Avatar src={image} sx={cardStyle} variant='square' />
          ) : (
            <Avatar sx={cardStyle} variant='square'>
              <QuestionMark />
            </Avatar>
          )}
        </Grid>
        <Grid
          item
          xs={8}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            paddingLeft: '0.5rem',
          }}
        >
          <Typography
            sx={{
              fontSize: '1.4rem',
              color: 'rgba(0, 0, 0, 0.87)',
            }}
          >
            {name}
          </Typography>
          <Rating max={3} value={level} readOnly />
        </Grid>
      </Grid>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          height: '2rem',
        }}
      >
        {tags.map((tag) => (
          <Tag key={tag.name} {...tag} />
        ))}
      </Box>
    </Paper>
  )
}
