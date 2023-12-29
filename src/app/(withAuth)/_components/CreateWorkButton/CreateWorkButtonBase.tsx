import { AddPhotoAlternateOutlined } from '@mui/icons-material'
import { Button } from '@mui/material'

export const CreateWorkButtonBase = () => (
  <Button
    variant='contained'
    startIcon={<AddPhotoAlternateOutlined />}
    type='submit'
  >
    新規追加
  </Button>
)
