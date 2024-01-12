import { Add } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'

type Props = {
  onClick?: () => void
  text: string
  type?: 'button' | 'submit' | 'reset'
}

export const AddButton = ({ onClick, text, type = 'button' }: Props) => (
  <Tooltip title={text}>
    <IconButton
      color='inherit'
      onClick={onClick}
      sx={{ border: '1px solid lightGray' }}
      type={type}
    >
      <Add sx={{ color: 'GrayText' }} />
    </IconButton>
  </Tooltip>
)
