FROM node:latest

WORKDIR /app
COPY ./src src
COPY ./static static
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
COPY ./tsconfig.json tsconfig.json
COPY ./webpack.config.js webpack.config.js
COPY ./server.js server.js

RUN npm install
RUN npm run build

EXPOSE 3000

CMD node server.js
