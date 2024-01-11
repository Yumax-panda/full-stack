import { useState } from 'react'

type UseMenuReturn = {
  anchorEl: HTMLElement | null
  handleOpenMenu: (event: React.MouseEvent<HTMLElement>) => void
  handleCloseMenu: () => void
}

export const useMenu = (): UseMenuReturn => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  return { anchorEl, handleOpenMenu, handleCloseMenu }
}
