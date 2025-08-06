# Base image
FROM node:22-alpine

# Set workdir
WORKDIR /app

# Copy dependencies
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy source code
COPY . .

# Expose port
EXPOSE 5000

# Start app
CMD ["node", "src/server.js"]
