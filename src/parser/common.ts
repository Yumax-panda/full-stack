export type Parser<T> = {
  toString: (value: T) => string
  fromString: (value: string) => T
}

export const toQueryString = (
  obj: Record<string, string | number | boolean | null>,
): string => {
  return Object.keys(obj)
    .map(
      (key) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(
          obj[key]?.toString() || '',
        )}`,
    )
    .join('&')
}

export const fromQueryString = (
  queryString: string,
): Record<string, string | null> => {
  const params = new URLSearchParams(queryString)
  const result: Record<string, string | null> = {}
  params.forEach((value, key) => {
    result[decodeURIComponent(key)] = decodeURIComponent(value) || null
  })
  return result
}
