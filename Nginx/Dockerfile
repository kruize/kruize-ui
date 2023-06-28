# Base image with Nginx
FROM registry.access.redhat.com/ubi8/nginx-118

# Copy Nginx configuration file to container
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for Nginx
EXPOSE 80