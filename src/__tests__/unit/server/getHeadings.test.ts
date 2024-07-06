import { expect, test } from 'vitest'

import { getHeadings } from '@/lib/editor/editor'

test('hタグが存在しない場合は空の配列を返す', () => {
  const html = `
  <div>
    <p>テスト</p>
    <img src="https://example.com/image.png" alt="画像">
  </div>
  `
  expect(getHeadings(html)).toEqual([])
})

test('空のページを渡した場合は空の配列を返す', () => {
  expect(getHeadings('')).toEqual([])
})

test('nullを渡した場合は空の配列を返す', () => {
  expect(getHeadings(null)).toEqual([])
})

test('h1タグが存在する場合はtextとlevelを返す', () => {
  const html = '<h1>見出し1</h1>'
  expect(getHeadings(html)).toEqual([{ text: '見出し1', level: 1 }])
})

test('h1タグとh2タグが存在する場合', () => {
  const html = `
  <h1>見出し1</h1>
  <h2>見出し2</h2>
  `
  expect(getHeadings(html)).toEqual([
    { text: '見出し1', level: 1 },
    { text: '見出し2', level: 2 },
  ])
})

test('空白込みのh1タグが存在する場合', () => {
  const html = '<h1>見出し1 </h1>'
  expect(getHeadings(html)).toEqual([{ text: '見出し1', level: 1 }])
})

test('h1タグが複数存在する場合', () => {
  const html = `
  <h1>見出し1</h1>
  <h1>見出し2</h1>
  `
  expect(getHeadings(html)).toEqual([
    { text: '見出し1', level: 1 },
    { text: '見出し2', level: 1 },
  ])
})
