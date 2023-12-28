import { Meta, StoryObj } from '@storybook/react'

import { SigninButton } from './'

export default {
  title: 'UI/SignInButton',
  component: SigninButton,
} as Meta

type Story = StoryObj<typeof SigninButton>

export const Default: Story = {
  args: {},
}
