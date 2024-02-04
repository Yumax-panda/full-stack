'use client'

import type { Tag as TagType } from '@prisma/client'
import { SkillForm } from '../SkillForm'
import { useCreateSkillForm } from '../hooks/useCreateSkillForm'
import { Box } from '@mui/material'

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
