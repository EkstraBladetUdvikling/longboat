FROM node:14-alpine as ts-compiler

WORKDIR /build

COPY package*.json ./
COPY rollup.config.js ./
COPY .eslintignore ./
COPY .eslintrc.js ./
COPY tsconfig*.json ./
COPY yarn.lock ./

COPY src ./src

RUN yarn install --ignore-scripts

RUN yarn build

FROM nginx:stable-alpine

COPY --from=ts-compiler /build/longboat.js /usr/share/nginx/html/longboat/

COPY include.html /usr/share/nginx/html/longboat

COPY default.conf.template /etc/nginx/templates/default.conf.template
