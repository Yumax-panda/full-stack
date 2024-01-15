import NextAuth from 'next-auth/next'
import GithubProvider from 'next-auth/providers/github'

import { prisma } from '@/lib/client'
import { env } from '@/lib/env.mjs'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

import type { NextAuthOptions } from 'next-auth'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
  ],
  secret: env.NEXTAUTH_SECRET,
  session: {
    strategy: 'database',
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  callbacks: {
    async redirect({ baseUrl }) {
      return baseUrl
    },
    async session({ session, user }) {
      if (session?.user) session.user.id = user.id
      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST, handler as PATCH, handler as DELETE }
