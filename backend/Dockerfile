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

# Copy source code (useful for fallback, though dev mounts override this)
COPY . .

# Expose the API port
EXPOSE 5000

# Start with nodemon for hot-reloading
CMD ["npm", "run", "dev"]

# ==============================================================================
# BUILD STAGE: Compiles TypeScript and prepares production dependencies
# ==============================================================================
FROM base AS build

# Install all dependencies (including TypeScript and devDependencies needed for build)
RUN npm install

# Copy source files
COPY . .

# Compile TypeScript to dist directory
RUN npm run build

# Prune devDependencies to keep production image lightweight
RUN npm prune --production

# ==============================================================================
# PRODUCTION RUNTIME STAGE: Minimal image for high security and performance
# ==============================================================================
FROM node:20-alpine AS production

WORKDIR /usr/src/app

# Copy built node_modules, compiled dist directory, and package files from build stage
COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

# ------------------------------------------------------------------------------
# Create required runtime directories
# ------------------------------------------------------------------------------
RUN mkdir -p \
        /usr/src/app/uploads \
        /usr/src/app/backups \
    && chown -R node:node /usr/src/app \
    && chmod -R 755 /usr/src/app/uploads \
    && chmod -R 755 /usr/src/app/backups

# Run the container under a non-privileged system user for security
USER node

# Default environment configuration
ENV NODE_ENV=production
ENV PORT=5000

# Expose API port
EXPOSE 5000

# Start the application using compiled JavaScript entry point
CMD ["node", "dist/server.js"]
