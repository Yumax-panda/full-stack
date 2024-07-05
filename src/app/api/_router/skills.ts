import { zValidator } from '@hono/zod-validator'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { Hono } from 'hono'
import { revalidateTag } from 'next/cache'

import type { Env } from '../types'

import { tag } from '@/lib/routes'
import { updateSkillSchema } from '@/models'
import { updateSkillWithTagIds } from '@/usecase/skills'

export const skill = new Hono<Env>()
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
      c.json(updated)
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002') {
        c.json({ error: '同じスキル名は登録できません' }, { status: 400 })
      }
      c.json({ error: 'error' }, { status: 400 })
    }
  })
// DELETE /api/skills/:skillId
