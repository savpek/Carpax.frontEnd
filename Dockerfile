FROM node:10.5

COPY ./ /usr/var/src/
WORKDIR /usr/var/src/

RUN npm install
RUN npm install -g @angular/cli

RUN ng build --prod