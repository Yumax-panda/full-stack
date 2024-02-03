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
        name: 'Frontend',
        color: 'skyblue',
        brief: 'Frontend',
      },
      {
        name: 'Backend',
        color: 'grey',
        brief: 'Backend',
      },
      {
        name: 'JavaScript',
        color: 'yellow',
        brief: null,
      },
    ],
  },
}
