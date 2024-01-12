'use client'

import type { SkillWithTags } from '@/models'
import { useState } from 'react'

import { StarField } from '@/app/(index)/_components/StarField'
import { Edit } from '@mui/icons-material'
import { Box, IconButton, Tooltip } from '@mui/material'

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
}

const EditableRow = ({ skill }: EditableTableRowProps) => {
  const [open, setOpen] = useState(false)
  const SkillTableRow = () => (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Box sx={{ width: '20%', pl: '1rem' }}>{skill.name}</Box>
      <Box sx={{ flexGrow: 1 }}>
        <StarField level={skill.level} />
      </Box>
      <Box sx={{ flexGrow: 4 }}>
        {skill.tags.map(({ name }) => name).join(', ')}
      </Box>
      <Box sx={{ flexGrow: 3, alignItems: 'flex-end', display: 'flex' }}>
        <ToggleEditButton onClick={() => setOpen(true)} />
      </Box>
    </Box>
  )
  return open ? <UpdateSkillForm {...skill} /> : <SkillTableRow />
}

type Props = {
  skills: SkillWithTags[]
}

export const SkillsTable = ({ skills }: Props) => (
  <Box sx={{ border: '1px solid lightgray', borderRadius: '0.5rem' }}>
    <Box sx={{ borderBottom: '1px solid lightgray', p: '0.5rem' }}>
      {skills.length} 件
    </Box>
    <Box>
      {skills.map((skill) => (
        <EditableRow skill={skill} key={skill.id} />
      ))}
    </Box>
  </Box>
)
