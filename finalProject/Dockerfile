FROM node:9.11

RUN mkdir /src

RUN npm install nodemon -g

WORKDIR /src
ADD app/package.json /src/package.json
RUN npm install
RUN npm install bcrypt
ADD app/nodemon.json /src/nodemon.json


EXPOSE 3000

CMD npm start
