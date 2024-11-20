FROM node:18

ARG RAILWAY_ENVIRONMENT_NAME

WORKDIR /app

COPY . .

RUN corepack enable && corepack prepare yarn@3.2.3 --activate

RUN yarn install --immutable

ARG NEXT_PUBLIC_TOKEN_SYMBOL
ARG NEXT_PUBLIC_NETWORK_NAME
ARG NEXT_PUBLIC_IMAGE_PROTOCOL
ARG NEXT_PUBLIC_IMAGE_HOSTNAME
ARG NEXT_PUBLIC_IMAGE_PORT
ARG NEXT_PUBLIC_BASE_URL

RUN yarn build

EXPOSE 8080

CMD ["yarn", "start",]