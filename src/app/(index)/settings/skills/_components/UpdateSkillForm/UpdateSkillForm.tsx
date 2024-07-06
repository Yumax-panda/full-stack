import { Box } from '@mui/material'

import { SkillForm } from '../SkillForm'
import { useUpdateSkillForm } from '../hooks/useUpdateSkillForm'

import type { SkillWithTags } from '@/models'
import type { Tag as TagType } from '@prisma/client'

type Props = {
  tags: TagType[]
  onClose: () => void
  onDelete: () => void
  skill: SkillWithTags
}

export const UpdateSkillForm = ({ skill, onClose, tags, onDelete }: Props) => {
  const props = useUpdateSkillForm({ skill, onClose })

  return (
    <Box sx={{ borderTop: '0.5px solid lightgray' }}>
      <SkillForm
        {...props}
        tags={tags}
        onDeleted={onDelete}
        onClose={onClose}
      />
    </Box>
  )
}
