import { BackButton } from '@/app/(index)/_components/BackButton'
import { Box } from '@mui/material'

type Props = {
  userId: string | undefined
}

export const TopContent = ({ userId }: Props) => {
  return userId ? (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2,
      }}
    >
      <BackButton userId={userId} />
    </Box>
  ) : null
}
