import { Star as MuiStar, StarOutline } from '@mui/icons-material'
import { Box } from '@mui/material'

type Props = {
  level: number
  size?: string | number
}

type StarProps = {
  filled: boolean
  size?: string | number
}

const Star = ({ filled, size = '2.5rem' }: StarProps) => {
  const Icon = filled ? MuiStar : StarOutline
  const color = filled ? 'gold' : 'gray'
  return <Icon sx={{ color, height: size, width: size }} />
}

export const StarField = ({ level, size }: Props) => {
  const filledStarNum = Math.min(3, Math.max(0, level))
  const stars = Array.from({ length: 3 }, (_, i) => i < filledStarNum)
  return (
    <Box sx={{ display: 'flex' }}>
      {stars.map((filled, i) => (
        <Star key={i} filled={filled} size={size} />
      ))}
    </Box>
  )
}
