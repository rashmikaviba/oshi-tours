# ==============================================================================
# BASE STAGE: Shared configuration and dependency definition
# ==============================================================================
FROM node:20-alpine AS base

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# ==============================================================================
# DEVELOPMENT STAGE: Installs all dependencies and mounts code
# ==============================================================================
FROM base AS development

# Install all dependencies (including devDependencies)
RUN npm install

# Copy source code
COPY . .

# Expose Next.js dev port
EXPOSE 3000

# Start Next.js development server
CMD ["npm", "run", "dev"]

# ==============================================================================
# BUILD STAGE: Builds production Next.js application
# ==============================================================================
FROM base AS build

# Install all dependencies required for Next.js build
RUN npm install

# Copy source files
COPY . .

# Disable Next.js telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1

# Build Next.js application
RUN npm run build

# ==============================================================================
# PRODUCTION RUNTIME STAGE: Minimal image for high security and performance
# ==============================================================================
FROM node:20-alpine AS production

WORKDIR /usr/src/app

# Copy built application assets, node_modules, and package files from build stage
COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/.next ./.next
COPY --from=build /usr/src/app/public ./public

# Create required runtime cache directories with non-privileged user permissions
RUN mkdir -p /usr/src/app/.next/cache \
    && chown -R node:node /usr/src/app

# Run container under non-privileged system user for security
USER node

# Default environment configuration
ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1

# Expose Next.js production port
EXPOSE 3000

# Start production Next.js server
CMD ["npm", "run", "start"]
