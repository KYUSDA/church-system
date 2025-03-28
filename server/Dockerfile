# Use official Node.js runtime as base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose the port your Express app runs on (e.g., 5000)
EXPOSE 5000

# Command to start the app
CMD ["npm", "start"]