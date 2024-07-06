import type { Meta, StoryObj } from '@storybook/react'

import { WorkCard } from './'

export default {
  title: 'Work/WorkCard',
  component: WorkCard,
} as Meta

type Story = StoryObj<typeof WorkCard>

export const Default: Story = {
  args: {
    id: '1',
    title: 'タイトル',
    thumbnail: 'https://mui.com/static/images/cards/contemplative-reptile.jpg',
    updatedAt: new Date(),
  },
}

export const NoThumbnail: Story = {
  args: {
    id: '1',
    title: 'タイトル',
    thumbnail: null,
    updatedAt: new Date(),
  },
}

export const SquareThumbnail: Story = {
  args: {
    id: '1',
    title: 'タイトル',
    thumbnail: 'https://mui.com/static/images/cards/live-from-space.jpg',
    updatedAt: new Date(),
  },
}

export const LongTitle: Story = {
  args: {
    id: '1',
    title: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    thumbnail: 'https://mui.com/static/images/cards/contemplative-reptile.jpg',
    updatedAt: new Date(),
  },
}
