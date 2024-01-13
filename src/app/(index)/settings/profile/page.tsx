import { notFound } from 'next/navigation'

import { getSession } from '@/lib/auth'
import { routes } from '@/lib/routes'

export default async function Page() {
  const session = await getSession()
  if (!session || !session.user?.id) return notFound()
  return <div>test</div>
}
