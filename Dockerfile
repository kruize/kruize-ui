
FROM node:14.17.0 AS builder

WORKDIR /builder

COPY package.json ./

RUN npm install --save

COPY . ./

RUN npm run build


# Production image

FROM node:14.17.0

COPY --from=builder /builder/dist ./dist

RUN npm install -g serve 

CMD ["serve", "-s", "dist"]




