import { Edit } from '@mui/icons-material'
import { Button } from '@mui/material'

import { routes } from '@/lib/routes'

type Props = {
  workId: string
}

export const EditButton = ({ workId }: Props) => (
  <Button
    variant='contained'
    startIcon={<Edit />}
    href={routes.createNewWork(workId)}
  >
    編集
  </Button>
)
