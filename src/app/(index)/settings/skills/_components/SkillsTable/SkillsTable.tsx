'use client'

import type { Tag as TagType } from '@prisma/client'
import type { SkillWithTags } from '@/models'
import { useState } from 'react'
import Link from 'next/link'
import { routes } from '@/lib/routes'
import { StarField } from '@/app/(index)/_components/StarField'
import { Add, Edit, Delete, LocalOfferOutlined } from '@mui/icons-material'
import { Box, Button, IconButton } from '@mui/material'

import { useDeleteSkill } from '../hooks/useDeleteSkill'
import { CreateSkillForm } from '../CreateSkillForm'
import { UpdateSkillForm } from '../UpdateSkillForm'
import { Container, Header, RowContainer } from '../../../_components/Table'

import { Tag } from '@/app/(index)/_components/Tag'

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
      <Box sx={{ width: 100, pl: '1rem', my: 'auto' }}>{skill.name}</Box>
      <Box sx={{ width: 'fit-content', my: 'auto' }}>
        <StarField level={skill.level} />
      </Box>
      <Box
        sx={{
          flexGrow: 3,
          my: 'auto',
          ml: '1rem',
          display: { xs: 'none', md: 'initial' },
        }}
      >
        {skill.tags.map((t) => (
          <Tag key={t.id} {...t} />
        ))}
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          my: 'auto',
          justifyContent: 'flex-end',
          display: 'flex',
        }}
      >
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
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: '1rem' }}>
        <Link href={routes.tag()}>
          <Button
            startIcon={<LocalOfferOutlined />}
            variant='contained'
            sx={{ mr: '1rem' }}
            href={routes.tag()}
          >
            タグを編集する
          </Button>
        </Link>
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
    </div>
  )
}
