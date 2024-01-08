import type { StoryObj, Meta } from '@storybook/react'
import { SaveButton } from './'

export default {
  title: 'UI/SaveButton',
  component: SaveButton,
} as Meta

type Story = StoryObj<typeof SaveButton>

export const Default: Story = {
  args: {
    onClick: () => { },
  },
}
