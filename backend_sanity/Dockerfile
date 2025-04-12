# Use Node.js as the base
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy the rest of the Sanity code
COPY . .

# Expose port 3333 (Sanity Studio dev server)
EXPOSE 3333

# Start in development mode
CMD ["npm", "run", "dev"]