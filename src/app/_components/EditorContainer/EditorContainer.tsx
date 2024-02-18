import { Container as Container, type ContainerProps } from '@mui/material'

export const EditorContainer = (props: ContainerProps) => {
  const { children, ...rest } = props
  return (
    <Container {...rest} sx={{ maxWidth: '728px' }}>
      {children}
    </Container>
  )
}
