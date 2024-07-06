import { handler } from '../core'

// NOTE: const runtime = "edge"とすると動かなくなる. 理由は不明.

export {
  handler as GET,
  handler as POST,
  handler as PATCH,
  handler as DELETE,
  handler as PUT,
}
