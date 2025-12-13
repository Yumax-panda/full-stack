import { Grid } from '@mui/material'

import { ArticleCard } from '../ArticleCard'

import type { ArticleWithOgp } from '@/usecase/article'

import { FadeIn } from '@/app/_components/FadeIn'

type Props = {
  articles: ArticleWithOgp[]
}

export const ArticleSection = ({ articles }: Props) => (
  <FadeIn>
    <Grid container spacing={2}>
      {articles.map((article) => (
        <Grid
          key={article.articleUrl}
          size={{
            xs: 12,
            sm: 6,
            md: 4,
          }}
        >
          <ArticleCard {...article} />
        </Grid>
      ))}
    </Grid>
  </FadeIn>
)
