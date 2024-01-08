import { SaveAltOutlined } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'

type Props = {
  onSubmit: () => void
  disabled?: boolean
}

export const SaveButton = ({ onSubmit }: Props) => (
  <Tooltip title='保存' placement='right-start'>
    <IconButton onSubmit={onSubmit} type='submit'>
      <SaveAltOutlined />
    </IconButton>
  </Tooltip>
)
