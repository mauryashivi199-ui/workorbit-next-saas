# syntax=docker/dockerfile:1

# -----------------------------------------------------------------------------
# 1. Base image with Alpine Node.js for minimal attack surface
# -----------------------------------------------------------------------------
FROM node:18-alpine AS base

# Install libc6-compat for Alpine if needed
RUN apk add --no-cache libc6-compat
WORKDIR /app

# -----------------------------------------------------------------------------
# 2. Dependencies installation stage (cached)
# -----------------------------------------------------------------------------
FROM base AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# -----------------------------------------------------------------------------
# 3. Builder stage: compile Next.js production bundle
# -----------------------------------------------------------------------------
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

# Dummy build-time env for static route compilation
ENV MONGODB_URI "mongodb://localhost:27017/crewzen_saas"

RUN npm run build

# -----------------------------------------------------------------------------
# 4. Production Runner stage: minimal, secure container
# -----------------------------------------------------------------------------
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Non-root secure user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy static assets and standalone bundle
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
