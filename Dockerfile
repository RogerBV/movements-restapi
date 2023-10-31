FROM node:14

COPY . /movements-restapi
WORKDIR /movements-restapi

RUN npm install

EXPOSE 3001

CMD npm run start