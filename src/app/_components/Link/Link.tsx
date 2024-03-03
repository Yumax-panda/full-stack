import NextLink from 'next/link'

type Props = Parameters<typeof NextLink>[0]

export const Link = ({ children, style, ...props }: Props) => (
  <NextLink
    {...props}
    style={{
      ...style,
      textDecoration: 'none',
      color: 'inherit',
    }}
  >
    {children}
  </NextLink>
)
