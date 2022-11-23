
FROM node:16 AS builder

WORKDIR /builder

COPY package.json ./

RUN npm config set legacy-peer-deps true

RUN npm install 

COPY . ./

#RUN npm run build
RUN ./deploy.sh -c

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

ENTRYPOINT ["nginx", "-g", "daemon off;"]
