import type { Meta, StoryObj } from '@storybook/react'

import { SkillSection } from './'

export default {
  title: 'Skill/SkillSection',
  component: SkillSection,
} as Meta

type Story = StoryObj<typeof SkillSection>

const tags = [
  {
    id: '1',
    name: 'JavaScript',
    color: 'skyblue',
    brief: 'Frontend',
  },
  {
    id: '2',
    name: 'TypeScript',
    color: 'blue',
    brief: null,
  },
]

const skills = [
  {
    id: 1,
    name: 'Next.js1',
    level: 3,
    image:
      'https://raw.githubusercontent.com/tandpfun/skill-icons/59059d9d1a2c092696dc66e00931cc1181a4ce1f/icons/NextJS-Light.svg',
    tags,
  },
  {
    id: 2,
    name: 'Next.js2',
    level: 2,
    image:
      'https://raw.githubusercontent.com/tandpfun/skill-icons/59059d9d1a2c092696dc66e00931cc1181a4ce1f/icons/NextJS-Light.svg',
    tags: [],
  },
  {
    id: 3,
    name: 'Next.js3',
    level: 1,
    image:
      'https://raw.githubusercontent.com/tandpfun/skill-icons/59059d9d1a2c092696dc66e00931cc1181a4ce1f/icons/NextJS-Light.svg',
    tags: tags.slice(0, 1),
  },
  {
    id: 4,
    name: 'Next.js4',
    level: 1,
    image:
      'https://raw.githubusercontent.com/tandpfun/skill-icons/59059d9d1a2c092696dc66e00931cc1181a4ce1f/icons/NextJS-Light.svg',
    tags: [...tags, ...tags],
  },
]

export const Default: Story = {
  args: {
    skills,
  },
}
