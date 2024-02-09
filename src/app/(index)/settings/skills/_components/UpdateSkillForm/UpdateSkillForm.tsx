import { Box } from '@mui/material'
import type { Tag as TagType } from '@prisma/client'
import { useUpdateSkillForm } from '../hooks/useUpdateSkillForm'
import { SkillForm } from '../SkillForm'

import type { SkillWithTags } from '@/models'

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
