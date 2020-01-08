FROM node:8.10-alpine

RUN mkdir /seedata

WORKDIR /seedata

COPY . /seedata

RUN psql -d postgres -f schema.sql

RUN npm install pg

CMD ["node", "/seedata/seed.js"]
