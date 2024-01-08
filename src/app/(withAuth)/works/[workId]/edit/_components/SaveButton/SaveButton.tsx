import { SaveAltOutlined } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'

type Props = {
  onClick: () => void
}

export const SaveButton = ({ onClick }: Props) => (
  <Tooltip title="保存" placement='right-start'>
    <IconButton onClick={onClick}>
      <SaveAltOutlined />
    </IconButton>
  </Tooltip>
)

