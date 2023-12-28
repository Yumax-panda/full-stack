import { Meta, StoryObj } from '@storybook/react'

import { Profile } from './'

export default {
  title: 'Profile',
  component: Profile,
} as Meta

type Story = StoryObj<typeof Profile>

const user = {
  name: 'Test User',
  id: 'test-user',
  location: 'Tokyo',
  organization: 'Test Inc.',
  image: 'https://avatars.githubusercontent.com/u/93650251?v=4',
}

const fewContentUser = {
  name: 'Test User',
  id: 'test-user',
  image: 'https://avatars.githubusercontent.com/u/93650251?v=4',
}

export const Default: Story = {
  args: {
    ...user,
  },
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
}

export const FewContent: Story = {
  args: {
    ...fewContentUser,
  },
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
}
