const faker = require('faker');
const path = require('path');
const fs = require('fs').promises;
const log = require('fancy-log');

const recordNum = 500000;

const randomRating = (min, max, precision) => Number.parseFloat(Math.random() * (max - min) + min).toPrecision(precision);

const locations = () => {
  var location = '';
  const min = 1;
  for (let i = 1; i <= recordNum; i++) {
    location += `${faker.lorem.words()},`; // title
    location += `${faker.address.streetAddress()},`; // address
    location += `${Math.floor(randomRating(min, recordNum))},`; // user_id
    location += `${i}`; // rating_id
    location += '\n';
  }
  return location;
};

const csvCreateTable = async () => {
  await fs.writeFile(path.join(__dirname, '/csv/locations.csv'), locations()).then(() => {
    log('Success: locations.csv');
  }).catch((err) => {
    log(`Error: ${err}`);
  });
};

csvCreateTable();
