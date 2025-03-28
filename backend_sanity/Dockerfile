# Use Node.js as the base
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .
RUN npm install

# Copy the rest of the Sanity code
COPY . .

# Expose port 3333 (Sanity Studio’s default port)
EXPOSE 3333

# Start Sanity Studio
CMD ["npm", "run", "start"]