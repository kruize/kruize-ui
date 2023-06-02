# FROM node:16 AS builder

# WORKDIR /builder

# RUN npm config set legacy-peer-deps true

# COPY package.json ./

# RUN npm install 

# COPY . ./

# COPY deploy.sh /deploy.sh

# RUN ./deploy.sh -c

# # Production image

# FROM registry.access.redhat.com/ubi8/nginx-118

# USER root

# COPY --from=builder /builder/dist/* ./

# USER default

# WORKDIR /etc/nginx

# RUN cp nginx.conf /tmp
# RUN sed -i 's|listen       \[::\]:8080 default_server|listen       8080|' /tmp/nginx.conf
# RUN sed -i 's|listen       8080 default_server;||' /tmp/nginx.conf
# RUN cat /tmp/nginx.conf >nginx.conf

# Expose 80

# ENTRYPOINT ["nginx", "-g", "daemon off;"]



# Use a base image with Node.js
FROM node:16

# Set the working directory
WORKDIR /app

RUN npm config set legacy-peer-deps true
# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose the desired port (optional)
EXPOSE 8080

# Set the command to start the React application
CMD ["npm", "run", "start"]