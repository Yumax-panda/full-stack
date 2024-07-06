import type { Meta, StoryObj } from '@storybook/react'

import { Description } from './Description'

export default {
  title: 'Text/Description',
  component: Description,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
} as Meta<typeof Description>

type Story = StoryObj<typeof Description>

export const Basic: Story = {
  args: { description: 'test' },
}
