import { zValidator } from '@hono/zod-validator'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { revalidateTag } from 'next/cache'

import { factory } from './utils'

import { DUPLICATED_NAME, UNKNOWN_ERROR } from '@/lib/error'
import { tag } from '@/lib/routes'
import { createSkillSchema, updateSkillSchema } from '@/models'
import { createSkill } from '@/repository/skill'
import { deleteSkill, updateSkillWithTagIds } from '@/usecase/skills'

export const skill = factory
  .createApp()
  // POST /skills
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
      return c.json({ error: UNKNOWN_ERROR }, { status: 400 })
    }
  })
  // PATCH /skills/:skillId
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
      return c.json({ error: UNKNOWN_ERROR }, { status: 400 })
    }
  })
  // DELETE /skills/:skillId
  .delete('/:skillId', async (c) => {
    const skillId = c.req.param('skillId')

    try {
      await deleteSkill(skillId)
      revalidateTag(tag.skill)
      return new Response(null, { status: 204 })
    } catch (e) {
      return c.json({ error: UNKNOWN_ERROR }, { status: 400 })
    }
  })
