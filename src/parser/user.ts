import type { Parser } from './common'
import { toQueryString } from './common'

type User = {
  name: string | null
  image: string | null
}

export const userParser: Parser<User> = {
  toString: ({ name, image }) => toQueryString({ name, image }),
  fromSearchParams: (searchParams) => {
    return {
      name: searchParams.get('name'),
      image: searchParams.get('image'),
    }
  },
}
