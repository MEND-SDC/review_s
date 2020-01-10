const faker = require('faker');
const fs = require('fs').promises;
const path = require('path');
const log = require('fancy-log');

const recordNum = 1000000;

const users = () => {
  var user = '';
  for (let i = 0; i <= recordNum; i++) {
    user += `${faker.name.firstName()},`; // first_name
    user += `${faker.name.lastName()},`; // last_name
    user += `${faker.internet.email()},`; // email
    user += `${faker.date.recent()},`; // join_date
    user += `${faker.address.city()},`; // city
    user += `${faker.address.state()},`; // state
    user += `${faker.image.avatar()}`; // image_url
    user += '\n';
  }
  return user;
};

const csvCreateTable = async () => {
  await fs.writeFile(path.join(__dirname, '/csv/users.csv'), users()).then(() => {
    log('Success: users.csv');
  }).catch((err) => {
    log(`Error: ${err}`);
  });
};

csvCreateTable();
