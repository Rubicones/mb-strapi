# Use Node 18
FROM node:18-alpine

# Install dependencies for better-sqlite3
RUN apk add --no-cache python3 make g++

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (build needs devDependencies)
RUN npm ci

# Copy source code
COPY . .

# Create data directory for SQLite
RUN mkdir -p /data

# Build the admin panel
RUN npm run build

# Remove devDependencies after build to reduce image size
RUN npm prune --production

# Expose Strapi port
EXPOSE 1337

# Set NODE_ENV to production
ENV NODE_ENV=production

# Start Strapi
CMD ["npm", "start"]
