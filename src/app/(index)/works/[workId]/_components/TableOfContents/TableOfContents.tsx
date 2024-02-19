import { Typography } from '@mui/material'
import { CardContainer } from '../CardContainer'
import styles from './TableOfContents.module.css'

type Props = {
  headings: { text: string; level: number }[]
}

export const TableOfContents = ({ headings }: Props) => {
  const minLevel = Math.min(...headings.map(({ level }) => level))
  return (
    <CardContainer>
      <Typography variant='h6' gutterBottom>
        目次
      </Typography>
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {headings.map(({ level, text }, i) => (
          <li
            key={`heading-${i}-${text}`}
            // 一番小さいレベルをheading1とし、それ以外は+1する
            // 全てレベルが同じ場合にheading0となるのを防ぐ
            className={styles[`heading${Math.max(1, level - minLevel + 1)}`]}
          >
            {text}
          </li>
        ))}
      </ul>
    </CardContainer>
  )
}
