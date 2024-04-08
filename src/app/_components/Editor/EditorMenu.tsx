import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material'

import type { Action } from './types'

type Props = {
  actions: Action[]
}

export const EditorMenu = ({ actions }: Props) => {
  return (
    <SpeedDial
      ariaLabel='Editor Menu'
      icon={<SpeedDialIcon />}
      openIcon={<SpeedDialIcon />}
      direction='right'
      sx={{
        position: 'fixed',
        bottom: 16,
        left: 16,
      }}
    >
      {actions.map(({ icon, tooltipTitle, onClick }) => (
        <SpeedDialAction
          key={tooltipTitle}
          icon={icon}
          tooltipTitle={tooltipTitle}
          onClick={onClick}
        />
      ))}
    </SpeedDial>
  )
}
