FROM node:20.10.0-alpine

WORKDIR /server

COPY . .

ENV NODE_ENV=production

ENV PORT 80

EXPOSE 80

RUN npm ci

CMD ["node", "./bin/www"]