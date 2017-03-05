FROM node:7.7

COPY ./ /usr/var/src/

WORKDIR /usr/var/src/

RUN npm install --silent
RUN npm install -g angular-cli@1.0.0-beta.26 --silent && npm cache clean --silent

RUN ng build -prod