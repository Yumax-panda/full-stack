import { Rating } from '@mui/material'

type Props = {
  level: number
  size?: 'small' | 'medium' | 'large'
}

export const StarField = ({ level, size }: Props) => (
  <Rating name='rating' value={level} max={3} size={size} readOnly />
)
