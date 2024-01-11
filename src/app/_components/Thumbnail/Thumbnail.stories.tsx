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

export const NoImage: Story = {
  args: {
    url: null,
    onClick: () => {},
  },
}

export const NoOnClick: Story = {
  args: {
    url: 'https://mui.com/static/images/cards/live-from-space.jpg',
    onClick: () => {},
  },
}

export const NoDeleteButton: Story = {
  args: {
    url: 'https://mui.com/static/images/cards/live-from-space.jpg',
    onClick: () => {},
    omitDeleteButton: true,
  },
}
