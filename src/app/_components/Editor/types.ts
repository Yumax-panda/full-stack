import type { ReactNode } from 'react'

export type Action = {
  icon: ReactNode
  tooltipTitle: string
  onClick?: () => void
}
