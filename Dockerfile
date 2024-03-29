FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

ARG firebase_api_key
ARG firebase_auth_domain
ARG firebase_project_id
ARG firebase_storage_bucket
ARG firebase_messaging_sender_id
ARG firebase_app_id
ARG firebase_measurement_id
ARG nextauth_secret
ARG private_key
ARG nextauth_url
ARG database_url
ARG direct_url
ARG discord_client_id
ARG discord_client_secret
ARG google_client_id
ARG google_client_secret
ARG github_client_id
ARG github_client_secret

ENV NEXT_PUBLIC_FIREBASE_API_KEY=$firebase_api_key
ENV NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=$firebase_auth_domain
ENV NEXT_PUBLIC_FIREBASE_PROJECT_ID=$firebase_project_id
ENV NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=$firebase_storage_bucket
ENV NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=$firebase_messaging_sender_id
ENV NEXT_PUBLIC_FIREBASE_APP_ID=$firebase_app_id
ENV NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=$firebase_measurement_id
ENV NEXTAUTH_SECRET=$nextauth_secret
ENV PRIVATE_KEY=$private_key
ENV NEXTAUTH_URL=$nextauth_url
ENV DATABASE_URL=$database_url
ENV DIRECT_URL=$direct_url
ENV DISCORD_CLIENT_ID=$discord_client_id
ENV DISCORD_CLIENT_SECRET=$discord_client_secret
ENV GOOGLE_CLIENT_ID=$google_client_id
ENV GOOGLE_CLIENT_SECRET=$google_client_secret
ENV GITHUB_CLIENT_ID=$github_client_id
ENV GITHUB_CLIENT_SECRET=$github_client_secret

# set redirect url for next-auth
RUN echo "NEXTAUTH_URL=$nextauth_url" > .env

# set database url for prisma
RUN echo "DATABASE_URL=$database_url" >> .env
RUN echo "DIRECT_URL=$direct_url" >> .env

# If using npm comment out above and use below instead
RUN npx prisma generate
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["node", "server.js"]