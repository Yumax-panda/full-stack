import { AddButton } from './'

import type { Meta, StoryObj } from '@storybook/react'

export default {
  title: 'UI/AddButton',
  component: AddButton,
} as Meta

type Story = StoryObj<typeof AddButton>

export const Default: Story = {
  args: {
    text: '追加',
  },
}
