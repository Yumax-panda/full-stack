import { Container as MuiContainer, type ContainerProps } from '@mui/material'

export const Container = (props: ContainerProps) => {
  const { children, ...rest } = props
  return (
    <MuiContainer maxWidth='md' {...rest}>
      {children}
    </MuiContainer>
  )
}
