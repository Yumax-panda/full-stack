import { MoreVert } from '@mui/icons-material'
import { Avatar, IconButton, Menu, MenuItem, Tooltip } from '@mui/material'
import Link from 'next/link'

import { useDeletePartialWork } from '../hooks/useDeletePartialWork'

import { useMenu } from '@/app/(index)/_components/hooks/useMenu'
import { routes } from '@/lib/routes'

type Props = {
  workId: string
}

export const WorkMenu = ({ workId }: Props) => {
  const { anchorEl, handleOpenMenu, handleCloseMenu } = useMenu()
  const { onDelete } = useDeletePartialWork({ workId })
  const handleDelete = async () => {
    await onDelete()
    handleCloseMenu()
  }

  return (
    <div>
      <Tooltip title='メニュー' arrow sx={{ bgcolor: "lightgray" }}>
        <IconButton onClick={handleOpenMenu}>
          <MoreVert />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <Link href={routes.createNewWork(workId)}>
          <MenuItem onClick={handleCloseMenu}>編集</MenuItem>
        </Link>
        <MenuItem onClick={handleDelete}>削除</MenuItem>
      </Menu>
    </div>
  )
}
