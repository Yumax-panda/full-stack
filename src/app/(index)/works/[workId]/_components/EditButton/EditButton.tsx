import { Edit } from '@mui/icons-material'
import { Button } from '@mui/material'

import { Link } from '@/app/_components/Link'
import { routes } from '@/lib/routes'

type Props = {
  workId: string
}

export const EditButton = ({ workId }: Props) => (
  <Link href={routes.createNewWork(workId)}>
    <Button
      variant='contained'
      color='primary'
      startIcon={<Edit />}
      sx={{ fontSize: '1.2rem' }}
      size='small'
    >
      編集
    </Button>
  </Link>
)
