'use client'

import { useState } from 'react'

import { Close } from '@mui/icons-material'
import { Alert, IconButton, Tooltip } from '@mui/material'

type Props = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error: { message }, reset }: Props) {
  const [show, setShow] = useState(true)

  const handleClose = () => {
    setShow(false)
    reset()
  }

  const CloseButton = () => (
    <Tooltip title='Close'>
      <IconButton
        aria-label='close'
        color='inherit'
        size='small'
        onClick={handleClose}
      >
        <Close fontSize='inherit' />
      </IconButton>
    </Tooltip>
  )

  return show ? (
    <Alert severity='error' action={<CloseButton />}>
      {message}
    </Alert>
  ) : null
}
