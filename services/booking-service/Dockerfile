# Use lightweight Node image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source code
COPY . .

# Expose service port (change per service)
EXPOSE 4003

# Start the service
CMD ["npm", "start"]