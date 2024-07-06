import { type ComponentPropsWithoutRef, forwardRef } from 'react'

import { TextField } from '@mui/material'

import type { TextFieldProps } from '@mui/material'

type RemovedProps =
  | 'variant'
  | 'label'
  | 'margin'
  | 'required'
  | 'fullWidth'
  | 'autoFocus'
type Props = Omit<TextFieldProps, RemovedProps> &
  ComponentPropsWithoutRef<'input'>

const TitleField = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { children, ...rest } = props
  return (
    <TextField
      {...rest}
      ref={ref}
      variant='standard'
      margin='normal'
      fullWidth
      autoFocus
      label={undefined}
      sx={{
        '& .MuiInputBase-root': {
          fontWeight: 'bold',
          color: 'GrayText',
          fontSize: (t) => t.typography.h5.fontSize,
        },
      }}
    />
  )
})

TitleField.displayName = 'TitleField'

export { TitleField }
