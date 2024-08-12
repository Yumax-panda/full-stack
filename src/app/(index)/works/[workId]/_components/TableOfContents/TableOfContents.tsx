import { Link } from '@/app/_components/Link'
import { Typography } from '@mui/material'
import { forwardRef } from 'react'
import { CardContainer } from '../CardContainer'
import { getTocId } from '../utils/id'
import styles from './TableOfContents.module.css'

type Props = {
  headings: { text: string; level: number }[]
}

export const TableOfContents = forwardRef<HTMLUListElement | null, Props>(
  ({ headings }, ref) => {
    const minLevel = Math.min(...headings.map(({ level }) => level))
    return (
      <CardContainer>
        <Typography variant='h6' component='section' gutterBottom>
          目次
        </Typography>
        <ul ref={ref} className={styles.toc}>
          {headings.map(({ level, text }, i) => (
            <Link
              key={`heading-${i}-${text}`}
              href={`#${text}`}
              className={styles.link}
            >
              <li
                // 一番小さいレベルをheading1とし、それ以外は+1する
                // 全てレベルが同じ場合にheading0となるのを防ぐ
                className={
                  styles[`heading${Math.max(1, level - minLevel + 1)}`]
                }
                id={getTocId(text)}
              >
                {text}
              </li>
            </Link>
          ))}
        </ul>
      </CardContainer>
    )
  },
)
