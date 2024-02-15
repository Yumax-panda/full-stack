import 'server-only'
import { env } from './env.mjs'

function getMessage(data: string): string {
  return `${env.PRIVATE_KEY}.${data}`
}

export async function getHashedMessage(data: string): Promise<string> {
  const algorithm = 'SHA-256'
  const encoder = new TextEncoder()
  const uint8 = encoder.encode(getMessage(data))
  const digest = await crypto.subtle.digest(algorithm, uint8)
  return Array.from(new Uint8Array(digest))
    .map((v) => v.toString(16).padStart(2, '0'))
    .join('')
}

export async function verify(
  data: string,
  signature: string,
): Promise<boolean> {
  const hashedMessage = await getHashedMessage(data)
  return hashedMessage === signature
}
