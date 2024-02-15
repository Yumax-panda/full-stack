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
