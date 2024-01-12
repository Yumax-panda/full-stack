'use client'

import type { SkillWithTags } from '@/models'
import { useState } from 'react'

import { Edit } from '@mui/icons-material'
import { Box, IconButton, Tooltip } from '@mui/material'

import { UpdateSkillForm } from '../UpdateSkillForm'

// NOTE: tableの内側にフォームをネストできないのでdisplay: table系のコンポーネントを使う
// TODO: テーブルのスタイルを調整する

const TableRow = ({ children }: { children: React.ReactNode }) => (
  <Box sx={{ display: 'table-row' }}>{children}</Box>
)

const TableCell = ({ children }: { children: React.ReactNode }) => (
  <Box sx={{ display: 'table-cell' }}>{children}</Box>
)

const TableHead = ({ children }: { children: React.ReactNode }) => (
  <Box sx={{ display: 'table-header-group' }}>{children}</Box>
)

const TableBody = ({ children }: { children: React.ReactNode }) => (
  <Box sx={{ display: 'table-row-group' }}>{children}</Box>
)

const Table = ({ children }: { children: React.ReactNode }) => (
  <Box sx={{ display: 'table' }}>{children}</Box>
)

type ToggleEditButtonProps = {
  onClick: () => void
}

const ToggleEditButton = ({ onClick }: ToggleEditButtonProps) => (
  <Tooltip title='編集'>
    <IconButton onClick={onClick}>
      <Edit />
    </IconButton>
  </Tooltip>
)

type EditableTableRowProps = {
  skill: SkillWithTags
}

const EditableTableRow = ({ skill }: EditableTableRowProps) => {
  const [open, setOpen] = useState(false)
  const SkillTableRow = () => (
    <TableRow>
      <TableCell>{skill.name}</TableCell>
      <TableCell>{skill.level}</TableCell>
      <TableCell>{skill.tags.map(({ name }) => name).join(', ')}</TableCell>
      <TableCell>
        <ToggleEditButton onClick={() => setOpen(true)} />
      </TableCell>
    </TableRow>
  )
  return open ? <UpdateSkillForm {...skill} /> : <SkillTableRow />
}

type Props = {
  skills: SkillWithTags[]
}

export const SkillsTable = ({ skills }: Props) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>スキル名</TableCell>
        <TableCell>レベル</TableCell>
        <TableCell>タグ</TableCell>
        <TableCell>編集</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {skills.map((skill) => (
        <EditableTableRow skill={skill} key={skill.id} />
      ))}
    </TableBody>
  </Table>
)
