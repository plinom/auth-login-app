FROM node:23.6.1-alpine3.20 AS installer
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci

FROM node:23.6.1-alpine3.20 AS builder
WORKDIR /usr/src/app
COPY --from=installer /usr/src/app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:23.6.1-alpine3.20 AS runner
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/.next/standalone .
COPY --from=builder /usr/src/app/.next/static ./.next/static

EXPOSE 3000
ENTRYPOINT [ "node", "server.js" ]
