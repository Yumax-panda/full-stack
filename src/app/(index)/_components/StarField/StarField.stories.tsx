import type { Meta, StoryObj } from '@storybook/react'
import { StarField } from './'

export default {
  title: 'StarField',
  component: StarField,
} as Meta

type Story = StoryObj<typeof StarField>

export const Default: Story = {
  args: {
    level: 3,
  },
}

export const Level0: Story = {
  args: {
    level: 0,
  },
}

export const CustomSize: Story = {
  args: {
    level: 2,
    size: '3rem',
  },
}
