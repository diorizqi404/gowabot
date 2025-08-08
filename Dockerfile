# Stage 1: Build dependencies
FROM node:22-alpine AS builder

# Set workdir
WORKDIR /app

# Copy dependencies first (better caching)
COPY package*.json ./

# Install dependencies (no dev deps)
RUN npm ci --omit=dev

# Stage 2: Final minimal image
FROM node:22-alpine

# Set NODE_ENV production untuk optimasi Node.js
ENV NODE_ENV=production

# Set limit heap size supaya nggak makan banyak RAM
ENV NODE_OPTIONS="--max-old-space-size=64"

# Set workdir
WORKDIR /app

# Copy only needed files from builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY . .

# Default command
CMD ["node", "src/server.js"]
