import type { Meta, StoryObj } from '@storybook/react'

import { ArticleCard } from './ArticleCard'

import type { ArticleWithOgp } from '@/usecase/article'
export default {
  title: 'Article/ArticleCard',
  component: ArticleCard,
} as Meta

type Story = StoryObj<typeof ArticleCard>

const article: ArticleWithOgp = {
  provider: 'QIITA',
  publishedAt: '2021-10-06T13:00:00+09:00',
  ogp: 'https://qiita-user-contents.imgix.net/https%3A%2F%2Fcdn.qiita.com%2Fassets%2Fpublic%2Farticle-ogp-background-9f5428127621718a910c8b63951390ad.png?ixlib=rb-4.0.0&w=1200&mark64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTkxNiZoPTMzNiZ0eHQ9ZGlzY29yZCUyMGJvdCUyMCVFMyU4MyU5OCVFMyU4MyVBQiVFMyU4MyU5NyVFMyU4MiVCMyVFMyU4MyU5RSVFMyU4MyVCMyVFMyU4MyU4OSVFMyU4MSVBRSVFNCVCRCU5QyVFMyU4MiU4QSVFNiU5NiVCOSZ0eHQtY29sb3I9JTIzMjEyMTIxJnR4dC1mb250PUhpcmFnaW5vJTIwU2FucyUyMFc2JnR4dC1zaXplPTU2JnR4dC1jbGlwPWVsbGlwc2lzJnR4dC1hbGlnbj1sZWZ0JTJDdG9wJnM9ZmVhNDhlOTQ0MTFkY2UzMzc5M2U5NmM4ZmFhZTQ3OWU&mark-x=142&mark-y=112&blend64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTYxNiZ0eHQ9JTQwWXVtYXgtcGFuZGEmdHh0LWNvbG9yPSUyMzIxMjEyMSZ0eHQtZm9udD1IaXJhZ2lubyUyMFNhbnMlMjBXNiZ0eHQtc2l6ZT0zNiZ0eHQtYWxpZ249bGVmdCUyQ3RvcCZzPTZhNmJlMzNhZmU4YmJjMTIyMDEwYWJmNzFjNjI3OGQz&blend-x=142&blend-y=491&blend-mode=normal&s=39c0c5a38afcec1091193eb7e559b955',
  articleUrl: 'https://qiita.com/Yumax-panda/items/677acd044c1d037c7d49',
}

const noOgpArticle: ArticleWithOgp = {
  provider: 'QIITA',
  publishedAt: '2021-10-06T13:00:00+09:00',
  articleUrl: 'https://qiita.com/Yumax-panda/items/677acd044c1d037c7d49',
}

export const Default: Story = {
  args: {
    ...article,
  },
}

export const NoOgp: Story = {
  args: {
    ...noOgpArticle,
  },
}
