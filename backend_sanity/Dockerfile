FROM node:22-alpine


RUN apk add --no-cache git bash

# Set the working directory
WORKDIR /app

# Copy and install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Install globally in container
RUN npm install -g @sanity/cli  

# Copy project files
COPY . .

# Build the Sanity Studio
# Note: Ensure that the Sanity Studio is set up to build correctly
RUN npm run build

# Expose the port Sanity Studio runs on
EXPOSE 3333

# Start the Sanity Studio
CMD ["npm", "run", "start"]
