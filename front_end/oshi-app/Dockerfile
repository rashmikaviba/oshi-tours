# ==============================================================================
# BUILD STAGE: Installs dependencies and builds Next.js production bundle
# ==============================================================================
FROM node:20-alpine AS build

WORKDIR /app

# Copy package lock and package json
COPY package*.json ./

# Install dependencies using clean install for reproducibility
RUN npm install

# Copy the rest of the application files
COPY . .

# Declare build arguments for environment variables
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ARG NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

# Expose them as environment variables during build time
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=$NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
ENV NEXT_TELEMETRY_DISABLED=1

# Build the production bundle
RUN npm run build

# ==============================================================================
# PRODUCTION STAGE: Nginx web server for high performance and static serving
# ==============================================================================
FROM nginx:stable-alpine AS production

# Copy built static files and assets from build stage to Nginx web root
COPY --from=build /app/public /usr/share/nginx/html
COPY --from=build /app/.next /usr/share/nginx/html/.next

# Copy custom Nginx config for client-side routing fallback and caching
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose HTTP port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
