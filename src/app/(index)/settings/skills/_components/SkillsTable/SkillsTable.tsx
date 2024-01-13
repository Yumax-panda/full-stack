'use client'

import type { SkillWithTags, Tag } from '@/models'
import { useState } from 'react'

import { StarField } from '@/app/(index)/_components/StarField'
import { Edit } from '@mui/icons-material'
import { Box, Chip, IconButton, Tooltip } from '@mui/material'

import { UpdateSkillForm } from '../UpdateSkillForm'

type ToggleEditButtonProps = {
  onClick: () => void
}

const ToggleEditButton = ({ onClick }: ToggleEditButtonProps) => (
  <Tooltip title='編集'>
    <IconButton onClick={onClick}>
      <Edit />
    </IconButton>
  </Tooltip>
)

type EditableTableRowProps = {
  skill: SkillWithTags
  tags: Tag[]
  userId: string
}

const EditableRow = ({ skill, tags, userId }: EditableTableRowProps) => {
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)
  const SkillTableRow = () => (
    <>
      <Box sx={{ width: '20%', pl: '1rem', display: 'flex' }}>
        <Box sx={{ my: 'auto' }}>{skill.name}</Box>
      </Box>
      <Box sx={{ flexGrow: 1, display: 'flex' }}>
        <Box sx={{ my: 'auto' }}>
          <StarField level={skill.level} />
        </Box>
      </Box>
      <Box sx={{ flexGrow: 4, display: 'flex' }}>
        <Box sx={{ my: 'auto' }}>
          {skill.tags.map((t) => (
            <Chip
              key={t.id}
              label={t.name}
              sx={{ mr: '0.5rem', bgcolor: `${t.color}` }}
            />
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          flexGrow: 3,
          display: 'flex',
          justifyContent: 'flex-end',
          pr: '1rem',
        }}
      >
        <Box sx={{ my: 'auto' }}>
          <ToggleEditButton onClick={() => setOpen(true)} />
        </Box>
      </Box>
    </>
  )
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        py: '0.5rem',
        borderBottom: '1px solid lightgray',
      }}
    >
      {open ? (
        <UpdateSkillForm
          {...skill}
          onClose={handleClose}
          allTags={tags}
          userId={userId}
        />
      ) : (
        <SkillTableRow />
      )}
    </Box>
  )
}

type Props = {
  skills: SkillWithTags[]
  tags: Tag[]
  userId: string
}

export const SkillsTable = ({ skills, tags, userId }: Props) => (
  <Box
    sx={{ border: '1px solid gray', borderRadius: '0.5rem', borderBottom: 0 }}
  >
    <Box
      sx={{ borderBottom: '1px solid gray', p: '0.5rem', bgcolor: 'lightgrey' }}
    >
      {skills.length} 件
    </Box>
    <Box>
      {skills
        .sort((a, b) => Number(a.createdAt > b.createdAt))
        .map((skill) => (
          <EditableRow
            skill={skill}
            key={skill.id}
            tags={tags}
            userId={userId}
          />
        ))}
    </Box>
  </Box>
)
