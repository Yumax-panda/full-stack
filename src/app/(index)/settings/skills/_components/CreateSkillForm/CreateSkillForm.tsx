'use client'

import { Box } from '@mui/material'

import { useCreateSkillForm } from '../hooks/useCreateSkillForm'
import { SkillForm } from '../SkillForm'

import type { Tag as TagType } from '@prisma/client'

type Props = {
  tags: TagType[]
  onClose: () => void
}

export const CreateSkillForm = ({ onClose, tags }: Props) => {
  const props = useCreateSkillForm({ onClose })

  return (
    <Box sx={{ bgcolor: 'grey.200', py: '0.25rem', borderRadius: '4px' }}>
      <SkillForm tags={tags} onClose={onClose} onDeleted={null} {...props} />
    </Box>
  )
}
