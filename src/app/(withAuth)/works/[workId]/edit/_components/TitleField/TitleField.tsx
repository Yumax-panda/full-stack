import { TextField } from '@mui/material'

import type { TextFieldProps } from '@mui/material'

type RemoveProps = 'variant' | 'label' | 'margin' | 'required' | 'fullWidth' | 'autoFocus'
export type Props = Omit<TextFieldProps, RemoveProps>

export const TitleField = (props: Props) => {
  const { children, ...rest } = props
  return (
    <TextField
      {...rest}
      variant="standard"
      margin="normal"
      required
      fullWidth
      autoFocus
      label={undefined}
      sx={{
        '& .MuiInputBase-root': {
          fontSize: '2rem',
          fontWeight: 700,
        },
      }}
    />
  )
}