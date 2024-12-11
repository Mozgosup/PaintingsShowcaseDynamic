# Stage 1: Build the React app
FROM node:18 as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire app to the container
COPY . .

# Build the app
RUN npm run build

# Stage 2: Serve the app with NGINX
FROM nginx:alpine

# Copy the built React app to the NGINX HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy a custom NGINX configuration file (optional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
