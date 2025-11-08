# Base image
FROM node:20-alpine

# Working directory inside container
WORKDIR /app

# Copy package files for dependency install
COPY package*.json ./

# Install deps (vite, react, etc.)
RUN npm install

# Copy the rest of the client project
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Run Vite dev server, allow host access
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
