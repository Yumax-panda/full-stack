import { Breadcrumbs as MuiBreadcrumbs, Typography } from '@mui/material'
import Link from 'next/link'
import { routes } from '@/lib/routes'

type Props = {
  links: { href: string; label: string }[]
}

export const Breadcrumbs = ({ links: original }: Props) => {
  const links = [{ href: routes.top(), label: 'ホーム' }, ...original]
  const last = links.pop()
  if (!last) return null
  return (
    <MuiBreadcrumbs aria-label='breadcrumb'>
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          prefetch
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          {label}
        </Link>
      ))}
      <Typography color='text.primary'>{last.label}</Typography>
    </MuiBreadcrumbs>
  )
}
