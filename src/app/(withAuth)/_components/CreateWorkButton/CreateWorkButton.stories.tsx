import type { StoryObj, Meta } from '@storybook/react'
import { CreateWorkButtonBase } from './CreateWorkButtonBase'

export default {
  title: 'UI/CreateWorkButton',
  component: CreateWorkButtonBase,
} as Meta

type Story = StoryObj<typeof CreateWorkButtonBase>

export const Default: Story = {}
