import Link from 'next/link'
import { Box, Typography } from '@mui/material'
import {
  Timeline,
  TimelineItem as Item,
  TimelineSeparator as Separator,
  TimelineConnector as Connector,
  TimelineContent as Content,
  TimelineDot as Dot,
} from '@mui/lab'

type AvailableLevels = 1 | 2 | 3

type Heading = {
  level: number
  text: string
  id: string
}

type Props = {
  headings: Heading[]
}

const getLevel = (value: number): AvailableLevels => {
  if (value >= 1) return 1
  if (value >= 2) return 2
  return 3
}

export const TableOfContents = ({ headings }: Props) => {
  const first = headings.shift()
  const last = headings.pop()

  const getFontSize = (level: AvailableLevels) => `${1 + (4 - level) * 0.2}rem`
  const getDotSize = (level: AvailableLevels) => `${(4 - level) * 0.2}rem`
  console.log('first', first)

  return (
    <Box>
      <Typography variant='caption' gutterBottom>
        目次
      </Typography>
      <Timeline position='right'>
        {first && (
          <Item>
            <Separator>
              <Dot
                color='grey'
                sx={{
                  width: getDotSize(getLevel(first.level)),
                  height: getDotSize(getLevel(first.level)),
                }}
              />
            </Separator>
            <Content>
              <Link
                href={`#${first.id}`}
                passHref
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Typography>{first.text}</Typography>
              </Link>
            </Content>
          </Item>
        )}
        {headings.map(({ text, level, id }) => {
          const dotSize = getDotSize(getLevel(level))
          const fontSize = getFontSize(getLevel(level))
          return (
            <Item key={id}>
              <Separator>
                <Connector />
                <Dot color='grey' sx={{ width: dotSize, height: dotSize }} />
                <Connector />
              </Separator>
              <Content sx={{ py: '0.5rem' }}>
                <Link
                  href={`#${id}`}
                  passHref
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <Typography fontSize={fontSize}>{text}</Typography>
                </Link>
              </Content>
            </Item>
          )
        })}
        {last && (
          <Item>
            <Separator>
              <Dot
                color='grey'
                sx={{
                  width: getDotSize(getLevel(last.level)),
                  height: getDotSize(getLevel(last.level)),
                }}
              />
            </Separator>
            <Content>
              <Link
                href={`#${last.id}`}
                passHref
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Typography fontSize={getFontSize(getLevel(last.level))}>
                  {last.text}
                </Typography>
              </Link>
            </Content>
          </Item>
        )}
      </Timeline>
    </Box>
  )
}
