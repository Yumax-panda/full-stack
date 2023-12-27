import { StoryObj, Meta } from '@storybook/react'

import { Subtitle } from './Subtitle'

export default {
  title: 'Text/Subtitle',
  component: Subtitle,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
} as Meta<typeof Subtitle>

type Story = StoryObj<typeof Subtitle>

export const Basic: Story = {
  args: { text: 'test' },
}
