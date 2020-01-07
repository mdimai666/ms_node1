FROM node:12.14

LABEL maintainer="mdimai666@mail.ru"

WORKDIR /var/www/node1
COPY package.json .
RUN npm i
COPY . .

EXPOSE 3001

CMD [ "npm", "start" ]   