FROM node:20.10.0-alpine

WORKDIR /server

COPY . .

ENV NODE_ENV=production

RUN npm ci --only=production
RUN npm i -g pm2

CMD ["pm2", "./bin/www"]