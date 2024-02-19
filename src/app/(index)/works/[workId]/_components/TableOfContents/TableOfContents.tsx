import { Box } from '@mui/material'
import { CardContainer } from '../CardContainer'
import styles from './TableOfContents.module.css'

type Props = {
  headings: { text: string; level: number }[]
}

export const TableOfContents = ({ headings }: Props) => (
  <CardContainer>
    <Box sx={{ fontSize: '1.2rem', mb: '1rem' }}>目次</Box>
    <Box component='ul' sx={{ listStyle: 'none', pl: 0 }}>
      {headings.map((heading, i) => (
        <Box
          key={i}
          component='li'
          className={styles[`heading${heading.level}`]}
          sx={{ mb: '0.5rem' }}
        >
          {heading.text}
        </Box>
      ))}
    </Box>
  </CardContainer>
)
