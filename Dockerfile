FROM node:16 AS builder

WORKDIR /app

COPY . ./

RUN npm config set legacy-peer-deps true \
  && npm install \
  && KRUIZE_UI_ENV=production npm run build

FROM nginx:latest

RUN rm /etc/nginx/conf.d/default.conf \
  &&mkdir -p /var/cache/nginx/client_temp /var/run/nginx \
  && chown -R nginx:nginx /var/cache/nginx /var/run/nginx \
  && touch /var/run/nginx.pid \
  && chown nginx:nginx /var/run/nginx.pid

# Switch to the non-root user
USER nginx

COPY --from=builder /app/dist/* /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
