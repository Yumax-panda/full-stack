import { Meta, StoryObj } from '@storybook/react'

import { SkillCard } from './SkillCard'

export default {
  title: 'Skill/SkillCard',
  component: SkillCard,
} as Meta

type Story = StoryObj<typeof SkillCard>

export const Default: Story = {
  args: {
    name: 'TypeScript',
    level: 1,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg',
    tags: [
      {
        id: '1',
        name: 'Frontend',
        color: 'skyblue',
        brief: 'Frontend',
      },
      {
        id: '2',
        name: 'Backend',
        color: 'grey',
        brief: 'Backend',
      },
      {
        id: '3',
        name: 'JavaScript',
        color: 'yellow',
        brief: null,
      },
    ],
  },
}
