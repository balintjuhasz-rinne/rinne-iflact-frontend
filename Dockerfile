FROM node:12-alpine as base

WORKDIR /app/

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production


FROM base as builder

RUN yarn install --frozen-lockfile --production=false

COPY . .
RUN yarn build


FROM base

ENV NODE_ENV=production

COPY next.config.js ./
COPY config /app/config
COPY server.js ./server.js

COPY public ./public
COPY --from=builder /app/.next /app/.next

EXPOSE 27191

CMD yarn start
