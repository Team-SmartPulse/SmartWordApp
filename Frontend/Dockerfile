FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn tsc

EXPOSE 3000

CMD ["yarn", "dev"]
