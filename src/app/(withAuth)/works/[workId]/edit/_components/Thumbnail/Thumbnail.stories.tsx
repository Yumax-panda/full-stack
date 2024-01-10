import type { Meta, StoryObj } from '@storybook/react'
import { Thumbnail } from './'

export default {
  title: 'UI/Thumbnail',
  component: Thumbnail,
} as Meta

type Story = StoryObj<typeof Thumbnail>

export const Default: Story = {
  args: {
    url: 'https://mui.com/static/images/cards/contemplative-reptile.jpg',
    onClick: () => {},
  },
}
