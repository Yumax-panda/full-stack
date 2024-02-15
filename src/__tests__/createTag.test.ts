// @vitest-environment happy-dom

import { expect, test } from 'vitest'
import { createTagSchema } from '@/models'

test('createTagSchema', () => {
  expect(
    createTagSchema.parse({ name: 'test', brief: null, color: '#000000' }),
  ).toEqual({ name: 'test', brief: null, color: '#000000' })
})

test('createTagSchema with title white spaced', () => {
  expect(
    createTagSchema.parse({ name: ' tes  t ', brief: null, color: '#000000' }),
  ).toEqual({ name: 'tes  t', brief: null, color: '#000000' })
})

test('createTagSchema invalid name with white space', () => {
  expect(() =>
    createTagSchema.parse({ name: ' ', brief: null, color: '#000000' }),
  ).toThrow()
})

test('createTagSchema invalid name with empty string', () => {
  expect(() =>
    createTagSchema.parse({ name: '', brief: null, color: '#000000' }),
  ).toThrow()
})

test('createTagSchema null brief from white space', () => {
  expect(
    createTagSchema.parse({
      name: 'test',
      brief: '  ',
      color: '#000000',
    }).brief,
  ).toBe(null)
})

test('createTagSchema null brief from null', () => {
  expect(
    createTagSchema.parse({ name: 'test', brief: null, color: '#000000' })
      .brief,
  ).toBe(null)
})

test('createTagSchema null brief from empty', () => {
  expect(
    createTagSchema.parse({ name: 'test', brief: '', color: '#000000' }).brief,
  ).toBe(null)
})

test('createTagSchema invalid color', () => {
  expect(() =>
    createTagSchema.parse({ name: 'test', brief: null, color: '#00000' }),
  ).toThrow()
})

test('trim title', () => {
  expect(
    createTagSchema.parse({ name: ' test ', brief: null, color: '#000000' })
      .name,
  ).toBe('test')
})
