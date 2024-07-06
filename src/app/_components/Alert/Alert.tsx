import { useEffect, useState } from 'react'

import { Close } from '@mui/icons-material'
import { IconButton, Alert as MuiAlert } from '@mui/material'

type State = {
  message: string
  success: boolean
}

type Props = {
  state: State | null
}

export const Alert = ({ state }: Props) => {
  const [open, setOpen] = useState(true)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    if (state) {
      setOpen(true)
    }
  }, [state])

  return state !== null && open ? (
    <MuiAlert
      severity={state.success ? 'success' : 'error'}
      action={
        <IconButton
          aria-label='close'
          color='inherit'
          size='small'
          onClick={handleClose}
        >
          <Close fontSize='inherit' />
        </IconButton>
      }
    >
      {state.message}
    </MuiAlert>
  ) : null
}
