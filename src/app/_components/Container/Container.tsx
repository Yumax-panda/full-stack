import { Container as MuiContainer } from '@mui/material'

import type { ContainerProps } from '@mui/material'

export const Container = (props: ContainerProps) => {
  const { children, ...rest } = props
  return (
    <MuiContainer maxWidth='lg' {...rest}>
      {children}
    </MuiContainer>
  )
}
