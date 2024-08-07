import { client } from '@/lib/client'
import { routes } from '@/lib/routes'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type UseAddWorkReturn = {
  addNewWorkAndRedirect: () => Promise<void>
  isLoading: boolean
}

export const useAddWork = (): UseAddWorkReturn => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const addNewWorkAndRedirect = async () => {
    setIsLoading(true)
    const res = await client.api.v1.works.$post()
    const work = await res.json()
    setIsLoading(false)
    router.refresh()
    router.push(routes.createNewWork(work.id))
  }

  return {
    addNewWorkAndRedirect,
    isLoading,
  }
}
