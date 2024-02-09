'use client'

import type { Tag as TagType } from '@prisma/client'
import { Box, Button, IconButton } from '@mui/material'
import { Edit, Delete, Add } from '@mui/icons-material'
import { Container, Header, RowContainer } from '../../../_components/Table'
import { useState } from 'react'
import { CreateTagForm } from '../CreateTagForm'
import { UpdateTagForm } from '../UpdateTagForm'
import { useDeleteTag } from '../hooks/useDeleteTag'
import { Tag } from '@/app/(index)/_components/Tag'

type TableRowProps = {
  tag: TagType
}

const TableRow = ({ tag }: TableRowProps) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const { onDelete: onDeleteConfirmed } = useDeleteTag({ tagId: tag.id })
  const onDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (
      window.confirm('本当に削除しますか？一度削除すると元には戻せません。')
    ) {
      await onDeleteConfirmed(e)
    }
  }

  return open ? (
    <UpdateTagForm onClose={handleClose} tag={tag} />
  ) : (
    <div>
      <RowContainer>
        <Box sx={{ pl: '1rem', my: 'auto', width: 100 }}>
          <Tag {...tag} />
        </Box>
        <Box sx={{ flexGrow: 1, my: 'auto', pl: '1rem' }}>{tag.brief}</Box>
        <Box sx={{ flexGrow: 0, my: 'auto' }}>
          <IconButton onClick={handleOpen} type='button'>
            <Edit />
          </IconButton>
          <IconButton onClick={onDelete} type='button'>
            <Delete />
          </IconButton>
        </Box>
      </RowContainer>
    </div>
  )
}

type Props = {
  tags: TagType[]
}

export const TagTable = ({ tags }: Props) => {
  const [open, setOpen] = useState(false)

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: '1rem' }}>
        <Button
          onClick={() => setOpen(true)}
          startIcon={<Add />}
          variant='contained'
        >
          タグを追加
        </Button>
      </Box>
      {open && (
        <Box sx={{ my: '0.5rem' }}>
          <CreateTagForm onClose={() => setOpen(false)} />
        </Box>
      )}
      <Container>
        <Header>{tags.length} 件</Header>
        {tags.map((tag) => (
          <TableRow key={tag.id} tag={tag} />
        ))}
      </Container>
    </Box>
  )
}
