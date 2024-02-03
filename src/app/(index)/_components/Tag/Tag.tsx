import { Chip, Tooltip } from '@mui/material'
import type { Tag as TagType } from '@prisma/client'

type Props = Pick<TagType, 'name' | 'color' | 'brief'>

export const Tag = ({ name, color, brief }: Props) => {
  return (
    <Tooltip title={brief} placement='bottom'>
      <Chip
        label={name}
        style={{ backgroundColor: color, color: 'white' }}
        variant='outlined'
      />
    </Tooltip>
  )
}
