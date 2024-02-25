import { SignInIconButton } from './SignInIconButton'

import type { Meta, StoryObj } from '@storybook/react'

export default {
  title: 'UI/SignInIconButton',
  component: SignInIconButton,
} as Meta

type Story = StoryObj<typeof SignInIconButton>

export const Default: Story = {
  args: {},
}
