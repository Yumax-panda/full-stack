"use client"

import { Add } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'

type Props = {
  onClick: () => void
  text: string
}

export const AddButton = ({ onClick, text }: Props) => (
  <Tooltip title={text}>
    <IconButton color='inherit' onClick={onClick} sx={{ border: "1px solid lightGray" }}>
      <Add sx={{ color: "GrayText" }} />
    </IconButton>
  </Tooltip>
)
