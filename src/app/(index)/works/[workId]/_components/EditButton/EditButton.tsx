import { routes } from '@/lib/routes'
import { Edit } from '@mui/icons-material'
import { Button } from '@mui/material'

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
