import { Breadcrumbs as MuiBreadcrumbs, Typography } from '@mui/material'
import { NavigateNext } from '@mui/icons-material'
import Link from 'next/link'

type Props = {
  links: { href: string; label: string }[]
}

export const Breadcrumbs = ({ links }: Props) => {
  const last = links.pop()
  if (!last) return null
  return (
    <MuiBreadcrumbs
      separator={<NavigateNext fontSize='small' />}
      aria-label='breadcrumb'
    >
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          prefetch
          style={{ textDecoration: 'none' }}
        >
          {label}
        </Link>
      ))}
      <Typography color='text.primary'>{last.label}</Typography>
    </MuiBreadcrumbs>
  )
}
