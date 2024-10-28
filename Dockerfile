FROM node:18

WORKDIR /app

COPY . .

RUN corepack enable && corepack prepare yarn@3.2.3 --activate

RUN yarn install --immutable

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
