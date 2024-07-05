import { handler } from '../core'

import type { PageConfig } from 'next'

export const config: PageConfig = {
  runtime: 'edge',
}

export {
  handler as GET,
  handler as POST,
  handler as PATCH,
  handler as DELETE,
  handler as PUT,
}
