import { defineConfig } from 'vitest/config'
import { loadEnvConfig } from '@next/env'

try {
  loadEnvConfig(process.cwd())
} catch (e) {
  console.error(e)
}

export default defineConfig({
  test: {
    env: {
      NEXT_PUBLIC_FIREBASE_API_KEY: 'test',
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: 'test',
      NEXT_PUBLIC_FIREBASE_PROJECT_ID: 'test',
      NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: 'test',
      NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: 'test',
      NEXT_PUBLIC_FIREBASE_APP_ID: 'test',
      NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: 'test',
      NEXTAUTH_SECRET: 'test',
      DISCORD_CLIENT_ID: 'test',
      DISCORD_CLIENT_SECRET: 'test',
      GITHUB_CLIENT_ID: 'test',
      GITHUB_CLIENT_SECRET: 'test',
      GOOGLE_CLIENT_ID: 'test',
      GOOGLE_CLIENT_SECRET: 'test',
      /*
       * データベース操作が重複しないようにGitHub Actionsではデータベースのテストをしない
       * そのため、環境変数はローカルの場合のみ読み込む
       */
      DATABASE_URL: process.env.DATABASE_URL || 'test',
      PRIVATE_KEY: 'test',
      NEXTAUTH_URL: 'http://localhost:3000',
    },
  },
})
