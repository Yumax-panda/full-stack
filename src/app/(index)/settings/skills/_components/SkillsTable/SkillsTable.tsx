'use client'

import type { Tag as TagType } from '@prisma/client'
import type { SkillWithTags } from '@/models'
import { useState } from 'react'

import { StarField } from '@/app/(index)/_components/StarField'
import { Add, Edit, Delete } from '@mui/icons-material'
import { Box, Button, IconButton } from '@mui/material'

import { useDeleteSkill } from '../hooks/useDeleteSkill'
import { CreateSkillForm } from '../CreateSkillForm'
import { UpdateSkillForm } from '../UpdateSkillForm'
import { Container, Header, RowContainer } from '../../../_components/Table'

type TableRowProps = {
  skill: SkillWithTags
  tags: TagType[]
}

const TableRow = ({ skill, tags }: TableRowProps) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const { onDelete: onDeleted } = useDeleteSkill({ skillId: skill.id })

  const onDelete = () => {
    if (confirm('スキルを削除しますか？一度削除すると元に戻せません。')) {
      onDeleted()
    }
  }

  return open ? (
    <UpdateSkillForm
      onClose={handleClose}
      tags={tags}
      skill={skill}
      onDelete={onDelete}
    />
  ) : (
    <RowContainer>
      <Box sx={{ width: '20%', pl: '1rem' }}>{skill.name}</Box>
      <Box sx={{ flexGrow: 1 }}>
        <StarField level={skill.level} />
      </Box>
      <Box sx={{ flexGrow: 0 }}>
        <IconButton onClick={handleOpen} type='button'>
          <Edit />
        </IconButton>
        <IconButton onClick={onDelete} type='button'>
          <Delete />
        </IconButton>
      </Box>
    </RowContainer>
  )
}

type Props = {
  skills: SkillWithTags[]
  tags: TagType[]
}

export const SkillsTable = ({ skills, tags }: Props) => {
  const [open, setOpen] = useState(false)

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: '1rem' }}>
        <Button
          onClick={() => setOpen(true)}
          startIcon={<Add />}
          variant='contained'
        >
          スキルを追加
        </Button>
      </Box>
      {open && (
        <Box sx={{ my: '0.5rem' }}>
          <CreateSkillForm onClose={() => setOpen(false)} tags={tags} />
        </Box>
      )}
      <Container>
        <Header>{skills.length} 件</Header>
        <Box>
          {skills
            .sort((a, b) => Number(a.createdAt < b.createdAt))
            .map((skill) => (
              <TableRow skill={skill} key={skill.id} tags={tags} />
            ))}
        </Box>
      </Container>
    </Box>
  )
}
