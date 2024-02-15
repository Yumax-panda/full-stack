// @vitest-environment node

import { sign, verify } from '@/lib/signature'
import { expect, test } from 'vitest'

test('sign and verify', async () => {
  const data = '__payload__'
  const signature = await sign(data)
  expect(await verify(data, signature)).toBe(true)
})

test('verify invalid signature', async () => {
  const data = '__payload__'
  expect(await verify(data, 'invalid')).toBe(false)
})

test('verify invalid empty data', async () => {
  const signature = await sign('')
  expect(await verify(' ', signature)).toBe(false)
})

test('verify valid empty data with empty signature', async () => {
  expect(await verify('', '')).toBe(false)
})

test('verify multibyte characters', async () => {
  const data = '🍣'
  const signature = await sign(data)
  expect(await verify(data, signature)).toBe(true)
})

test('verity invalid multibyte characters', async () => {
  const data = '🍣'
  expect(await verify(data, 'invalid')).toBe(false)
})

test('verity url unsafe characters', async () => {
  const data = "https://e  x　ample.com/?q=🍣__|||ああああ____###''}*"
  const signature = await sign(data)
  expect(await verify(data, signature)).toBe(true)
})
