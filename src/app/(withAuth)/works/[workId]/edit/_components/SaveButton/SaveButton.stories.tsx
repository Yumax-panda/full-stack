import { SaveButton } from './'

import type { StoryObj, Meta } from '@storybook/react'

export default {
  title: 'UI/SaveButton',
  component: SaveButton,
} as Meta

type Story = StoryObj<typeof SaveButton>

export const Default: Story = {
  args: {
    onSubmit: () => {},
  },
}
