FROM node:7.7

COPY . /usr/var/src

WORKDIR /usr/var/src

RUN npm install -g angular-cli@1.0.0-beta.26 && npm cache clean

RUN ng build -prod