FROM node:20-alpine

WORKDIR /app

# Install Expo CLI globally
RUN npm install -g expo-cli

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Expose the web port
EXPOSE 19006

# Start Expo Web
CMD ["npx", "expo", "start", "--web", "--host", "lan", "--port", "19006"]

