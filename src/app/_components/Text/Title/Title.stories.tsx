import { Meta, StoryObj } from '@storybook/react'

import { Title } from './Title'

export default {
  title: 'Text/Title',
  component: Title,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
} as Meta<typeof Title>

type Story = StoryObj<typeof Title>

export const Basic: Story = {
  args: { title: 'test' },
}
