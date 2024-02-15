import crypto from 'node:crypto'

globalThis.crypto = crypto as unknown as Crypto
