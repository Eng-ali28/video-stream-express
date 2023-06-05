
ARG NODE_VERSION=18.16.0

FROM node:${NODE_VERSION}-alpine


ENV NODE_ENV development


WORKDIR /usr/src/app

COPY package*.json .

COPY prisma ./prisma/

RUN npm ci


COPY . .


CMD ["npm" , "run" , "start:dev"]
