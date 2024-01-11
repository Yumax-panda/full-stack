import { Meta, StoryObj } from '@storybook/react'

import { WorkSection } from './'

export default {
  title: 'Work/WorkSection',
  component: WorkSection,
} as Meta

type Story = StoryObj<typeof WorkSection>

export const Default: Story = {
  args: {
    works: [
      {
        id: '0',
        title: 'タイトル',
        thumbnail: 'https://mui.com/static/images/cards/live-from-space.jpg',
        updatedAt: new Date(),
      },
      {
        id: '1',
        title: 'タイトル',
        thumbnail: 'https://mui.com/static/images/cards/live-from-space.jpg',
        updatedAt: new Date(),
      },
      {
        id: '2',
        title: 'タイトル',
        thumbnail:
          'https://mui.com/static/images/cards/contemplative-reptile.jpg',
        updatedAt: new Date(),
      },
      {
        id: '3',
        title: 'タイトル',
        thumbnail: null,
        updatedAt: new Date(),
      },
      {
        id: '4',
        title: 'タイトル',
        thumbnail: 'https://mui.com/static/images/cards/live-from-space.jpg',
        updatedAt: new Date(),
      },
      {
        id: '5',
        title: 'タイトル',
        thumbnail: 'https://mui.com/static/images/cards/live-from-space.jpg',
        updatedAt: new Date(),
      },
      {
        id: '6',
        title: 'タイトル',
        thumbnail: null,
        updatedAt: new Date(),
      },
      {
        id: '7',
        title: 'タイトル',
        thumbnail: null,
        updatedAt: new Date(),
      },
      {
        id: '8',
        title: 'タイトル',
        thumbnail: null,
        updatedAt: new Date(),
      },
    ],
  },
}
