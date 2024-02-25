import { AddButtonBase } from './'

import type { Meta, StoryObj } from '@storybook/react'

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
