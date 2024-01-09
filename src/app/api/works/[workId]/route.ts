import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { getSession } from '@/lib/auth'
import { updateWork } from '@/usecase/work'

const formSchema = z.object({
  title: z.string().nullish(),
  content: z.string().nullish(),
  thumnail: z.string().nullish(),
})

export async function POST(
  req: NextRequest,
  { params: { workId } }: { params: { workId: string } },
) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const form = formSchema.safeParse(body)
  if (!form.success) {
    return NextResponse.json({ error: form.error }, { status: 400 })
  }

  const work = await updateWork({
    workId,
    ...form.data,
  })

  if (!work) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json(work, { status: 200 })
}
