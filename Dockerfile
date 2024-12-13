# Use the official Node.js image as the base image
# Choose a specific version for stability (e.g., 18-alpine for a lightweight build)
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and yarn.lock files first to leverage Docker caching
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install --frozen-lockfile

# Copy the rest of the application files
COPY . .

# Build the application (optional, for frontend or production-ready builds)
# RUN yarn build

# Expose the port the app runs on
EXPOSE 9018

# Start the application
CMD ["yarn", "dev" ,"--port" , "9018"]
