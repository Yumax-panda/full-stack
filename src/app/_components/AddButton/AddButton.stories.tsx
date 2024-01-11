import type { Meta, StoryObj } from '@storybook/react'
import { AddButton } from './'

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