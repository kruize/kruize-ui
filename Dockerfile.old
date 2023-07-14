FROM node:16 AS builder

WORKDIR /builder

RUN npm config set legacy-peer-deps true

COPY package.json ./

RUN npm install 

COPY . ./

COPY deploy.sh /deploy.sh

RUN ./deploy.sh -c

FROM registry.access.redhat.com/ubi8/nginx-118

USER root

COPY --from=builder /builder/dist/* /usr/share/nginx/html

#RUN rm -rf /etc/nginx/conf.d/default.conf

#COPY ./nginx.conf /etc/nginx/conf.d

#USER default

EXPOSE 80

# WORKDIR /etc/nginx

# RUN cp nginx.conf /tmp
# RUN sed -i 's|listen       \[::\]:8080 default_server|listen       8080|' /tmp/nginx.conf
# RUN sed -i 's|listen       8080 default_server;||' /tmp/nginx.conf
# RUN cat /tmp/nginx.conf >nginx.conf



#ENTRYPOINT ["nginx", "-g", "daemon off;"]
