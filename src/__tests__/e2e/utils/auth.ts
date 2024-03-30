import type { Page, Browser } from '@playwright/test'
import type { User } from '@prisma/client'

import { SessionFactory, userCreatedTest } from '@/__tests__/utils/factory'
import { env } from '@/lib/env.mjs'

type AuthenticatedUserCreatedTest = ({
  browser,
  test,
}: {
  browser: Browser
  test: ({ user, page }: { user: User; page: Page }) => Promise<void>
}) => () => Promise<void>

/**
 * ユーザーがログインしていることを仮定したテスト
 * NextAuthはCookieを使ってセッションの認証を行うため、
 * ブラウザのCookieにセッショントークンを追加することでログイン状態を再現している
 */
export const authenticatedUserCreatedTest: AuthenticatedUserCreatedTest =
  ({ browser, test }) =>
  async () => {
    userCreatedTest(async ({ user }) => {
      const session = await SessionFactory.create()

      const context = await browser.newContext()
      const [protocol, host] = env.NEXTAUTH_URL.split('://')
      await context.addCookies([
        {
          name: 'authjs.session-token',
          value: session.sessionToken,
          domain: host,
          path: '/',
        },
      ])

      const page = await context.newPage()
      await test({ user, page })
      await context.close()
      await browser.close()
    })
  }
