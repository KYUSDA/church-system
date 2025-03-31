# Stage 1: Build the React app
FROM node:18 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if it exists)
COPY package.json package-lock.json* ./
RUN npm install

# Copy the rest of your React app
COPY . .

# Build the React app for production (Vite outputs to 'dist')
RUN npm run build

# Stage 2: Serve the built app with Nginx
FROM nginx:alpine

# Copy the built files from the 'builder' stage (Vite outputs to 'dist', not 'build')
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 (Nginx default)
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]