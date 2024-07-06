import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { revalidateTag } from 'next/cache'

import { authMiddleware } from '../_middlewares/auth'

import type { Env } from '../types'

import { UNKNOWN_ERROR } from '@/lib/error'
import { tag } from '@/lib/routes'
import { updateWorkInServer } from '@/models'
import { updateWork, deleteWork } from '@/usecase/work'

export const work = new Hono<Env>()
  .use('*', authMiddleware)
  // PATCH /api/works/:workId
  .patch('/:workId', zValidator('json', updateWorkInServer), async (c) => {
    const workId = c.req.param('workId')
    const work = c.req.valid('json')

    try {
      const updated = await updateWork({
        ...work,
        id: workId,
        userId: c.var.user.id,
      })
      revalidateTag(tag.work)
      return c.json(updated, { status: 200 })
    } catch (e) {
      console.error('failed to update work', e)
      return c.json({ error: UNKNOWN_ERROR }, { status: 400 })
    }
  })
  // DELETE /api/works/:workId
  .delete('/:workId', async (c) => {
    const workId = c.req.param('workId')

    try {
      await deleteWork(workId)
      revalidateTag(tag.work)
      return new Response(null, { status: 204 })
    } catch (e) {
      console.error('failed to delete work', e)
      return c.json({ error: UNKNOWN_ERROR }, { status: 400 })
    }
  })
