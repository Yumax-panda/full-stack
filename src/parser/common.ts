export type Parser<T> = {
  toString: (value: T) => string
  fromSearchParams: (searchParams: URLSearchParams) => T | null
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
