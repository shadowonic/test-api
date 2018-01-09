FROM node:latest

RUN curl -o- -L https://yarnpkg.com/install.sh | bash
RUN npm i -g typescript ts-node
RUN npm i -g nodemon

ADD . /var/www/pro-net-api

WORKDIR /var/www/pro-net-api

RUN yarn install

EXPOSE 3000

CMD ["docker/start.sh"]