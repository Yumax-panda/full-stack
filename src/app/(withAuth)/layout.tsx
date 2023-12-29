import { notFound } from 'next/navigation'

import { getSession } from '@/lib/auth'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
  params: { userId: string }
}) {
  const session = await getSession()
  if (!session) notFound()

  return <div>{children}</div>
}
