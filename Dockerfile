FROM node:20.10.0-alpine

WORKDIR /server

COPY . .

ENV NODE_ENV=production

ENV PORT 80

EXPOSE 80

RUN npm ci

RUN npm i sequelize-cli

RUN npx sequelize-cli db:migrate

CMD ["node", "./bin/www"]