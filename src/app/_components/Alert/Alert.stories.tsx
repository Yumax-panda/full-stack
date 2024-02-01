import type { Meta, StoryObj } from '@storybook/react'
import { Alert } from '.'

export default {
  title: 'Alert',
  component: Alert,
} as Meta

type Story = StoryObj<typeof Alert>

export const Default: Story = {
  args: {
    state: {
      message: '更新しました',
      success: true,
    },
  },
}

export const Error: Story = {
  args: {
    state: {
      message: '更新に失敗しました',
      success: false,
    },
  },
}
