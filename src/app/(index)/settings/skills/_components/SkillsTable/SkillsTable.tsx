'use client'

import type { Tag as TagType } from '@prisma/client'
import type { SkillWithTags } from '@/models'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { StarField } from '@/app/(index)/_components/StarField'
import { routes } from '@/lib/routes'
import { Add, Edit } from '@mui/icons-material'
import { Box, Button, IconButton, Tooltip } from '@mui/material'

import { CreateSkillForm } from '../CreateSkillForm'
import { DeleteSkillButton } from '../DeleteSkillButton'
import { deleteSkillAction } from '../DeleteSkillButton/action'
import { UpdateSkillForm } from '../UpdateSkillForm'
import { Tag } from '@/app/(index)/_components/Tag'
import { Container, Header, RowContainer } from '../../../_components/Table'

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

type EditableTableRowProps = {
  skill: SkillWithTags
  tags: TagType[]
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
            <Tag key={t.id} {...t} />
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
  tags: TagType[]
  userId: string
  action?: string
}

export const SkillsTable = ({ skills, tags, userId, action }: Props) => {
  const router = useRouter()
  const toggleOpen = () => {
    if (action && action === 'new') {
      router.push(routes.userSkillEdit())
    } else {
      router.push(routes.userSkillEdit('new'))
    }
  }

  const open = action === 'new'

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: '1rem' }}>
        <CreateSkillButton onClick={toggleOpen} />
      </Box>
      <Container>
        <Header>{skills.length} 件</Header>
        <Box>
          {open && (
            <RowContainer>
              <CreateSkillForm
                onClose={() => router.push(routes.userSkillEdit())}
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
      </Container>
    </Box>
  )
}
