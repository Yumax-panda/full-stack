import { expect, test } from 'vitest'

import { updateWorkSchema } from '@/models'

test('schema: update PrivateWork without content', () => {
  expect(() => {
    updateWorkSchema.parse({
      id: 'test',
      userId: 'test',
      pinned: true,
      title: '',
      content: '',
      thumnail: 'test',
      isPrivate: true,
    })
  }).not.toThrow()
})

test('schema: update PrivateWork with content', () => {
  expect(() => {
    updateWorkSchema.parse({
      id: 'test',
      userId: 'test',
      pinned: true,
      title: 'test',
      content: 'test',
      thumnail: 'test',
      isPrivate: true,
    })
  }).not.toThrow()
})

test('schema: update PublicWork without content', () => {
  expect(() => {
    updateWorkSchema.parse({
      id: 'test',
      userId: 'test',
      pinned: true,
      title: '',
      content: 'test',
      thumnail: 'test',
      isPrivate: false,
    })
  }).toThrow()
})
