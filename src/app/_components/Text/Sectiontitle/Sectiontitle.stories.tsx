import { Meta, StoryObj } from '@storybook/react'

import { Sectiontitle } from './Sectiontitle'

export default {
  title: 'Text/Sectiontitle',
  component: Sectiontitle,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
} as Meta<typeof Sectiontitle>

type Story = StoryObj<typeof Sectiontitle>

export const Basic: Story = {
  args: { text: 'test' },
}
