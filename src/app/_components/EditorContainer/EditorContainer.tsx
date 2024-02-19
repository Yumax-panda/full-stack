import { Container, type ContainerProps } from '@mui/material'

export const EditorContainer = (props: ContainerProps) => {
  const { children, maxWidth, ...rest } = props
  return (
    <Container {...rest} sx={{ maxWidth: '728px !important' }}>
      {children}
    </Container>
  )
}
