import { expect, test } from 'vitest'

import { isEmpty } from '@/models'

test('isEmpty <div></div>', () => {
  expect(isEmpty('<div></div>')).toBe(true)
})

test("isEmpty ''", () => {
  expect(isEmpty('')).toBe(true)
})

test('isEmpty null', () => {
  expect(isEmpty(null)).toBe(true)
})

test('isEmpty undefined', () => {
  expect(isEmpty(undefined)).toBe(true)
})

test('isEmpty <div>test</div>', () => {
  expect(isEmpty('<div>test</div>')).toBe(false)
})

test('isEmpty nested empty div', () => {
  expect(isEmpty('<div><div></div></div>')).toBe(true)
})

test('isEmpty nested div', () => {
  expect(isEmpty('<div><div>test</div></div>')).toBe(false)
})

test('isEmpty nested empty div with space', () => {
  expect(isEmpty('<div> <div> </div> </div>')).toBe(true)
})

test('isEmpty nested div with space', () => {
  expect(isEmpty('<div> <div> test </div> </div>')).toBe(false)
})

test('isEmpty nested empty div with br', () => {
  expect(isEmpty('<div><div><br></div></div>')).toBe(true)
})

test('isEmpty multiple line1', () => {
  expect(isEmpty('<br/>  <div>test</div> <div>test</div>')).toBe(false)
})

test('isEmpty multiple line2', () => {
  expect(isEmpty('<br/>  <div> </div> <div> </div>  ')).toBe(true)
})
