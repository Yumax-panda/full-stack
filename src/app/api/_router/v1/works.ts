import { UNKNOWN_ERROR } from '@/lib/error'
import { tag } from '@/lib/routes'
import { updateWorkInServer } from '@/models'
import { deleteWork, updateWork } from '@/usecase/work'
import { getOrCreateEmptyWork } from '@/usecase/work'
import { zValidator } from '@hono/zod-validator'
import { revalidateTag } from 'next/cache'
import { factory } from './utils'

export const work = factory
  .createApp()
  .post('/', async (c) => {
    const userId = c.var.user.id
    const work = await getOrCreateEmptyWork(userId)
    return c.json(work, { status: 201 })
  })
  // PATCH /works/:workId
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
      return c.json({ error: UNKNOWN_ERROR }, { status: 400 })
    }
  })
  // DELETE /works/:workId
  .delete('/:workId', async (c) => {
    const workId = c.req.param('workId')

    try {
      await deleteWork(workId)
      revalidateTag(tag.work)
      return new Response(null, { status: 204 })
    } catch (e) {
      return c.json({ error: UNKNOWN_ERROR }, { status: 400 })
    }
  })
