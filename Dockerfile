FROM node:18.17.1

WORKDIR /application

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]