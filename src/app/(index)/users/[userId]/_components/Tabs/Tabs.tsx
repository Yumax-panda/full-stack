'use client'

import { Tab, Tabs as MuiTabs } from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'

import { routes } from '@/lib/routes'

type Props = {
  userId: string
}

export const Tabs = ({ userId }: Props) => {
  const pathname = usePathname()
  const router = useRouter()

  const paths = {
    技術: routes.userSkill(userId),
    制作物: routes.userWork(userId),
    執筆記事: routes.userArticle(userId),
  }
  const handleChange = (_: React.SyntheticEvent, href: string) => {
    router.push(href)
  }

  return (
    <MuiTabs
      value={pathname}
      onChange={handleChange}
      sx={{ borderBottom: 1, borderColor: 'lightgray' }}
    >
      {Object.entries(paths).map(([label, href]) => (
        <Tab
          key={href}
          label={label}
          value={href}
          sx={{ fontSize: '1.2rem', mr: '1rem' }}
        />
      ))}
    </MuiTabs>
  )
}
