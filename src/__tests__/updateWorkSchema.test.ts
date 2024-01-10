import { expect, test } from 'vitest'

import { updateWorkSchema } from '@/models'

const commonProps = {
  id: 'test',
  userId: 'test',
  pinned: true,
  thumbnail: 'test',
}

test('schema: update PrivateWork without content', () => {
  expect(() => {
    updateWorkSchema.parse({
      title: '',
      content: '',
      isPrivate: true,
      ...commonProps,
    })
  }).not.toThrow()
})

test('schema: update PrivateWork with content', () => {
  expect(() => {
    updateWorkSchema.parse({
      title: 'test',
      content: 'test',
      isPrivate: true,
      ...commonProps,
    })
  }).not.toThrow()
})

test('schema: update PublicWork without content', () => {
  expect(() => {
    updateWorkSchema.parse({
      title: '',
      content: 'test',
      isPrivate: false,
      ...commonProps,
    })
  }).toThrow()
})

test('schema: update PublicWork with empty html', () => {
  expect(() => {
    updateWorkSchema.parse({
      title: 'test',
      content: '<div></div>',
      isPrivate: false,
      ...commonProps,
    })
  }).toThrow()
})

test('schema: update PublicWork without title', () => {
  expect(() => {
    updateWorkSchema.parse({
      title: ' ',
      content: '<div>test</div>',
      isPrivate: false,
      ...commonProps,
    })
  }).toThrow()
})

test('schema: update PublicWork with content', () => {
  expect(() => {
    updateWorkSchema.parse({
      title: 'test',
      content: '<div>test</div>',
      isPrivate: false,
      ...commonProps,
    })
  }).not.toThrow()
})

test('schema: update PublicWork with title to be trimed', () => {
  const payload = {
    title: ' test ',
    content: '<div>test</div>',
    isPrivate: false,
    ...commonProps,
  }

  expect(() => {
    updateWorkSchema.parse(payload)
  }).not.toThrow()

  const parsed = updateWorkSchema.parse(payload)
  expect(parsed.title).toBe('test')
})

test('schema: update PrivateWork with title to be null', () => {
  const parsed = updateWorkSchema.parse({
    title: ' ',
    content: '<div>test</div>',
    isPrivate: true,
    ...commonProps,
  })
  expect(parsed.title).toBeNull()
})

test('schema: update PrivateWork with content to be null', () => {
  const parsed = updateWorkSchema.parse({
    title: 'test',
    content: '<div> </div>',
    isPrivate: true,
    ...commonProps,
  })
  expect(parsed.content).toBeNull()
})

test('schema: update PrivateWork with content not to be null', () => {
  const parsed = updateWorkSchema.parse({
    title: 'test',
    content: '<div> test</div>',
    isPrivate: true,
    ...commonProps,
  })
  expect(parsed.content).not.toBeNull()
})

test('schema: update PrivateWork with thumbnail to be null', () => {
  const { thumbnail, ...rest } = commonProps
  const parsed = updateWorkSchema.parse({
    title: 'test',
    content: '<div>test</div>',
    thumbnail: '',
    isPrivate: true,
    ...rest,
  })
  expect(parsed.thumbnail).toBeNull()
})

test('schema: update PrivateWork with thumbnail not to be null', () => {
  const { thumbnail, ...rest } = commonProps
  const parsed = updateWorkSchema.parse({
    title: 'test',
    content: '<div>test</div>',
    thumbnail: 'test',
    isPrivate: true,
    ...rest,
  })
  expect(parsed.thumbnail).toBe('test')
})
