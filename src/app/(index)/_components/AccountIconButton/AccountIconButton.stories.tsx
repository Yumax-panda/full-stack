import { AccountIconButton } from '.'

import type { Meta, StoryObj } from '@storybook/react'

export default {
  title: 'UI/AccountIconButton',
  component: AccountIconButton,
} as Meta

type Story = StoryObj<typeof AccountIconButton>

export const Default: Story = {
  args: {
    id: '1',
    name: 'テストユーザー',
    image: null,
  },
}
