import { DUPLICATED_NAME, UNKNOWN_ERROR } from '@/lib/error'
import { tag as routeTag } from '@/lib/routes'
import { createTagSchema, updateTagSchema } from '@/models'
import { createTag, deleteTag, updateTag } from '@/repository/tag'
import { zValidator } from '@hono/zod-validator'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { Hono } from 'hono'
import { revalidateTag } from 'next/cache'
import type { UserRelatedEnv } from '../types'

export const tag = new Hono<UserRelatedEnv>()
  // POST /tags
  .post('/', zValidator('json', createTagSchema), async (c) => {
    const tag = c.req.valid('json')

    try {
      const created = await createTag({ ...tag, userId: c.var.user.id })
      revalidateTag(routeTag.tag)
      return c.json(created, { status: 201 })
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002') {
        return c.json({ error: DUPLICATED_NAME }, { status: 400 })
      }
      return c.json({ error: UNKNOWN_ERROR }, { status: 400 })
    }
  })
  // PATCH /tags/:tagId
  .patch('/:tagId', zValidator('json', updateTagSchema), async (c) => {
    const tagId = c.req.param('tagId')
    const tag = c.req.valid('json')

    try {
      const updated = await updateTag({
        ...tag,
        id: tagId,
        userId: c.var.user.id,
      })
      revalidateTag(routeTag.tag)
      return c.json(updated, { status: 200 })
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002') {
        return c.json({ error: DUPLICATED_NAME }, { status: 400 })
      }
      return c.json({ error: UNKNOWN_ERROR }, { status: 400 })
    }
  })
  // DELETE /tags/:tagId
  .delete('/:tagId', async (c) => {
    const tagId = c.req.param('tagId')

    try {
      await deleteTag(tagId)
      return new Response(null, { status: 204 })
    } catch (e) {
      return c.json({ error: UNKNOWN_ERROR }, { status: 500 })
    }
  })
