FROM node:20.10.0-alpine

WORKDIR /server

COPY . .

ENV NODE_ENV=production

ARG POSTGRES_HOST=${POSTGRES_HOST}
ARG POSTGRES_PORT=${POSTGRES_PORT}
ARG POSTGRES_USER=${POSTGRES_USER} 
ARG POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
ARG POSTGRES_DB_PROD=${POSTGRES_DB_PROD}

ENV POSTGRES_HOST=${POSTGRES_HOST}
ENV POSTGRES_PORT=${POSTGRES_PORT}
ENV POSTGRES_USER=${POSTGRES_USER} 
ENV POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
ENV POSTGRES_DB_PROD=${POSTGRES_DB_PROD}

ENV PORT 80

EXPOSE 80

RUN npm ci

RUN npm i sequelize-cli

RUN npx sequelize-cli db:migrate

CMD ["node", "./bin/www"]