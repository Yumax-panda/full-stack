const replaceWhitespace = (text: string): string => {
  return text.replace(/\s/g, '-')
}

export const encodeURLSafe = (text: string): string =>
  encodeURIComponent(replaceWhitespace(text).toLowerCase())
