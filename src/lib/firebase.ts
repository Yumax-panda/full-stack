import { getApps, initializeApp } from 'firebase/app'
import { connectStorageEmulator, getStorage } from 'firebase/storage'

import { env } from './env.mjs'

const firebaseConfig = {
  apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

export const app = getApps().length
  ? getApps()[0]
  : initializeApp(firebaseConfig)

const storage = getStorage(app)

if (process.env.NODE_ENV !== 'production') {
  console.log('Connecting to the storage emulator')
  connectStorageEmulator(storage, '127.0.0.1', 9199)
}

export { storage }
