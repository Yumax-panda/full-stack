import { Chip, Tooltip } from '@mui/material'
import { hexToRgb } from '@/lib/color'
import type { Tag as TagType } from '@prisma/client'

type Props = Pick<TagType, 'name' | 'color' | 'brief'>

export const Tag = ({ name, color, brief }: Props) => {
  const bgColorRGB = hexToRgb(color)
  const bgcolor = `rgba(${bgColorRGB.r}, ${bgColorRGB.g}, ${bgColorRGB.b}, 0.18)`

  return (
    <Tooltip title={brief} placement='bottom' arrow>
      <Chip
        label={name}
        sx={{ bgcolor, color, fontWeight: 'bold', borderColor: color }}
        variant='outlined'
      />
    </Tooltip>
  )
}
