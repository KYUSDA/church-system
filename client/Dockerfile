# Start with a Node.js image (like picking a base OS with Node pre-installed)
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .
RUN npm install

# Copy the rest of your React app
COPY . .

# Build the React app for production
RUN npm run build

# Use a lightweight web server to serve the built app
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html

# Expose port 80 (where the app will be served)
EXPOSE 80

# Start the web server
CMD ["nginx", "-g", "daemon off;"]