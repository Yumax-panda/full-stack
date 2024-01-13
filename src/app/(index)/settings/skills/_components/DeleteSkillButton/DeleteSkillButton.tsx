import { Delete } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'

export const DeleteSkillButton = () => (
  <Tooltip title='削除' arrow placement='top'>
    <IconButton type='submit'>
      <Delete />
    </IconButton>
  </Tooltip>
)
