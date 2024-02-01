import { Meta, StoryObj } from '@storybook/react'

import { SectionTitle } from './SectionTitle'

export default {
  title: 'Text/SectionTitle',
  component: SectionTitle,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
} as Meta<typeof SectionTitle>

type Story = StoryObj<typeof SectionTitle>

export const Basic: Story = {
  args: { text: 'test' },
}
