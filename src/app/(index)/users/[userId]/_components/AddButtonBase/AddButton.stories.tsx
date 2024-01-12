import type { Meta, StoryObj } from '@storybook/react'
import { AddButtonBase } from './'

export default {
  title: 'UI/AddButtonBase',
  component: AddButtonBase,
} as Meta

type Story = StoryObj<typeof AddButtonBase>

export const Default: Story = {
  args: {
    text: 'Add',
    onClick: () => {},
  },
}
