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
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/.env .

EXPOSE 3001
CMD [ "node", "dist/main.js" ]
