import type { Parser } from './common'
import { fromQueryString, toQueryString } from './common'

type User = {
  name: string | null
  image: string | null
}

export const userParser: Parser<User> = {
  toString: ({ name, image }) => toQueryString({ name, image }),
  fromString: (value) => {
    const obj = fromQueryString(value)
    return {
      name: obj.name ?? null,
      image: obj.image ?? null,
    }
  },
}
