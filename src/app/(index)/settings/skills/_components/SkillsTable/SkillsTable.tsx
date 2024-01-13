'use client'

import type { SkillWithTags, Tag } from '@/models'
import { useState } from 'react'

import { StarField } from '@/app/(index)/_components/StarField'
import { Add, Edit } from '@mui/icons-material'
import { Box, Button, Chip, IconButton, Tooltip } from '@mui/material'

import { CreateSkillForm } from '../CreateSkillForm'
import { DeleteSkillButton } from '../DeleteSkillButton'
import { deleteSkillAction } from '../DeleteSkillButton/action'
import { UpdateSkillForm } from '../UpdateSkillForm'

type ToggleEditButtonProps = {
  onClick: () => void
}

const ToggleEditButton = ({ onClick }: ToggleEditButtonProps) => (
  <Tooltip title='編集' arrow placement='top'>
    <IconButton onClick={onClick}>
      <Edit />
    </IconButton>
  </Tooltip>
)

const RowContainer = ({ children }: { children: React.ReactNode }) => (
  <Box
    sx={{
      display: 'flex',
      width: '100%',
      py: '0.5rem',
      borderBottom: '1px solid lightgray',
    }}
  >
    {children}
  </Box>
)

type EditableTableRowProps = {
  skill: SkillWithTags
  tags: Tag[]
  userId: string
}

const EditableRow = ({ skill, tags, userId }: EditableTableRowProps) => {
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)
  const deleteAction = deleteSkillAction.bind(null, skill.id)
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
        <Box sx={{ my: 'auto', display: 'flex' }}>
          <ToggleEditButton onClick={() => setOpen(true)} />
          <form action={deleteAction}>
            <DeleteSkillButton />
          </form>
        </Box>
      </Box>
    </>
  )
  return (
    <RowContainer>
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
    </RowContainer>
  )
}

type CreateSkillButtonProps = {
  onClick: () => void
}

const CreateSkillButton = ({ onClick }: CreateSkillButtonProps) => (
  <Button onClick={onClick} variant='contained' startIcon={<Add />}>
    スキルを追加
  </Button>
)

type Props = {
  skills: SkillWithTags[]
  tags: Tag[]
  userId: string
}

export const SkillsTable = ({ skills, tags, userId }: Props) => {
  const [open, setOpen] = useState(false)
  const toggleOpen = () => setOpen((prev) => !prev)

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: '1rem' }}>
        <CreateSkillButton onClick={toggleOpen} />
      </Box>
      <Box
        sx={{
          border: '1px solid gray',
          borderRadius: '0.5rem',
          borderBottom: 0,
        }}
      >
        <Box
          sx={{
            borderBottom: '1px solid gray',
            p: '0.5rem',
            bgcolor: 'lightgrey',
          }}
        >
          {skills.length} 件
        </Box>
        <Box>
          {open && (
            <RowContainer>
              <CreateSkillForm
                onClose={toggleOpen}
                allTags={tags}
                userId={userId}
              />
            </RowContainer>
          )}
          {skills
            .sort((a, b) => Number(a.createdAt < b.createdAt))
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
    </Box>
  )
}
