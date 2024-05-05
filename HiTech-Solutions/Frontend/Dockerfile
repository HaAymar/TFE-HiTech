# Build stage
FROM node:18.18.0 as build-stage

# Create app directory
WORKDIR /app

# Install app dependencies by copying package files and running npm ci
COPY package*.json ./
RUN npm ci

# Bundle app source
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine as production-stage

# Remove apt cache and unnecessary packages to keep the image clean
# Since using alpine, use apk instead of apt
RUN apk update && \
    apk add --no-cache nano && \
    rm -rf /var/cache/apk/*

# Copy built assets from the build stage
COPY --from=build-stage /app/build /usr/share/nginx/html

# Copy the Nginx configuration file
COPY ./nginx/default.conf /etc/nginx/conf.d/

# Expose port 80 and 443
EXPOSE 80 443

# Command to run nginx
CMD ["nginx", "-g", "daemon off;"]
