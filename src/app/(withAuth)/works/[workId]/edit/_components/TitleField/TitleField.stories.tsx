import { TitleField } from './'

import type { StoryObj, Meta } from '@storybook/react'

export default {
  title: 'UI/TitleField',
  component: TitleField,
} as Meta

type Story = StoryObj<typeof TitleField>

export const Default: Story = {
  args: {
    placeholder: 'タイトル',
  },
}
