import { zValidator } from '@hono/zod-validator'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { Hono } from 'hono'
import { revalidateTag } from 'next/cache'

import { authMiddleware } from '../_middlewares/auth'

import type { Env } from '../types'

import { DUPLICATED_NAME, UNKNOWN_ERROR } from '@/lib/error'
import { tag } from '@/lib/routes'
import { updateSkillSchema, createSkillSchema } from '@/models'
import { createSkill } from '@/repository/skill'
import { updateSkillWithTagIds, deleteSkill } from '@/usecase/skills'

export const skill = new Hono<Env>()
  .use('*', authMiddleware)
  // POST /api/skills
  .post('/', zValidator('json', createSkillSchema), async (c) => {
    const skill = c.req.valid('json')

    try {
      const created = await createSkill({ ...skill, userId: c.var.user.id })
      revalidateTag(tag.skill)
      return c.json(created, { status: 201 })
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002') {
        return c.json({ error: DUPLICATED_NAME }, { status: 400 })
      }
      console.error('failed to create skill', e)
      return c.json({ error: UNKNOWN_ERROR }, { status: 400 })
    }
  })
  // PATCH /api/skills/:skillId
  .patch('/:skillId', zValidator('json', updateSkillSchema), async (c) => {
    const skillId = c.req.param('skillId')
    const skill = c.req.valid('json')

    try {
      const updated = await updateSkillWithTagIds({
        ...skill,
        id: skillId,
        userId: c.var.user.id,
      })
      revalidateTag(tag.skill)
      return c.json(updated)
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002') {
        return c.json({ error: DUPLICATED_NAME }, { status: 400 })
      }
      console.error('failed to update skill', e)
      return c.json({ error: UNKNOWN_ERROR }, { status: 400 })
    }
  })
  // DELETE /api/skills/:skillId
  .delete('/:skillId', async (c) => {
    const skillId = c.req.param('skillId')

    try {
      await deleteSkill(skillId)
      revalidateTag(tag.skill)
      return new Response(null, { status: 204 })
    } catch (e) {
      console.error('failed to delete skill', e)
      return c.json({ error: UNKNOWN_ERROR }, { status: 400 })
    }
  })
