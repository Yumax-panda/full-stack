import { Add } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'

type Props = {
  onClick?: () => void
  text: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

export const AddButton = ({
  onClick,
  text,
  type = 'button',
  disabled = false,
}: Props) => (
  <Tooltip title={text} arrow placement='top-end'>
    <IconButton
      onClick={onClick}
      sx={{
        border: '1px solid lightGray',
        backgroundColor: 'white',
        '&:hover': { backgroundColor: 'lightGray' },
      }}
      type={type}
      disabled={disabled}
    >
      <Add sx={{ color: 'GrayText' }} />
    </IconButton>
  </Tooltip>
)
