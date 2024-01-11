import type { Meta, StoryObj } from '@storybook/react'
import { SignInIconButton } from './SignInIconButton'

export default {
  title: 'UI/SignInIconButton',
  component: SignInIconButton,
} as Meta

type Story = StoryObj<typeof SignInIconButton>

export const Default: Story = {
  args: {},
}
