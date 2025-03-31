# Use Node.js as the base
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Install TypeScript globally (if not in package.json)
RUN npm install -g typescript

# Copy the rest of the backend code
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build  # Assumes you have a "build" script like "tsc"

# Debugging: Ensure `dist/` exists
RUN ls -l dist/

# Expose port 3000 (matches your server.ts)
EXPOSE 8000

# Start the compiled server
# CMD ["node", "dist/server.js"]  # Adjust "dist/server.js" based on your tsconfig.json
CMD ["sh", "-c", "node dist/server.js"]