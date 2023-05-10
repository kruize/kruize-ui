
FROM node:16 AS builder

ARG IP
ARG PORT

WORKDIR /builder


COPY package.json ./

RUN npm config set legacy-peer-deps true

RUN npm install 

COPY . ./

COPY deploy.sh /deploy.sh

# Replace the placeholders in the deploy script with the IP and port
RUN sed -i "s/{{IP}}/$IP/g" /deploy.sh && \
    sed -i "s/{{PORT}}/$PORT/g" /deploy.sh && \
    chmod +x /deploy.sh

RUN ./deploy.sh -p

# Production image

FROM registry.access.redhat.com/ubi8/nginx-118

# WORKDIR /usr/share/nginx/html

USER root

RUN rm -rf ./*

COPY --from=builder /builder/dist/* ./

USER default

WORKDIR /etc/nginx

RUN cp nginx.conf /tmp
RUN sed -i 's|listen       \[::\]:8080 default_server|listen       8080|' /tmp/nginx.conf
RUN sed -i 's|listen       8080 default_server;||' /tmp/nginx.conf
RUN cat /tmp/nginx.conf >nginx.conf

# RUN cat nginx.conf

# ENTRYPOINT ["/bin/sh", "-c" ,"nginx -t && nginx -g daemon off;"]
Expose 80
#RUN npm run start

# Start the deployment script and create an ssh tunnel
#CMD ["/bin/sh", "-c", "./deploy.sh -d "]

ENTRYPOINT ["nginx", "-g", "daemon off;"]

