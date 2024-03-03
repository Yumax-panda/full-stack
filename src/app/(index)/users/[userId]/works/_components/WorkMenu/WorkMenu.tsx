'use client'

import { MoreVert } from '@mui/icons-material'
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material'
import Link from 'next/link'

import { useDeletePartialWork } from '../hooks/useDeletePartialWork'

import { useMenu } from '@/app/(index)/_components/hooks/useMenu'
import { routes } from '@/lib/routes'

type Props = Parameters<typeof useDeletePartialWork>[0]

export const WorkMenu = ({ workId }: Props) => {
  const { anchorEl, handleOpenMenu, handleCloseMenu } = useMenu()
  const { onDelete } = useDeletePartialWork({ workId })
  const handleDelete = async () => {
    await onDelete()
    handleCloseMenu()
  }

  return (
    <div>
      <Tooltip title='メニュー' arrow>
        <IconButton onClick={handleOpenMenu}>
          <MoreVert />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <Link
          href={routes.createNewWork(workId)}
          style={{
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <MenuItem onClick={handleCloseMenu}>編集</MenuItem>
        </Link>
        <MenuItem onClick={handleDelete}>削除</MenuItem>
      </Menu>
    </div>
  )
}
