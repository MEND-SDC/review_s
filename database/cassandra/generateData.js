const faker = require('faker');
const log = require('fancy-log');
const fs = require('fs').promises;
const path = require('path');

const recordNum = 10;
const recordNumAThird = Math.floor(recordNum / 3);

const randomRating = (min, max, precision) => Number.parseFloat(Math.random() * (max - min) + min).toPrecision(precision);

const rating = (count) => {
  let rates = '';
  const min = 2.98;
  const max = 5;
  const precision = 3;
  for (let i = 1; i <= count; i++) {
    rates += `${i},`; // rating_id
    rates += `${randomRating(min, max, precision)},`;
    rates += `${randomRating(min, max, precision)},`;
    rates += `${randomRating(min, max, precision)},`;
    rates += `${randomRating(min, max, precision)},`;
    rates += `${randomRating(min, max, precision)},`;
    rates += `${randomRating(min, max, precision)},`;
    rates += `${randomRating(min, max, precision)}`;
    rates += '\n';
  }
  return rates;
};

const reviews = (count) => {
  let review = '';
  var reviews_id = 1;
  for (let userId = 1; userId <= count; userId++) {
    const reviewCount = Math.floor(randomRating(4, 9));
    for (let j = 1; j <= reviewCount; j++) {
      review += `${reviews_id},`; // reviews_id
      review += `${faker.date.recent()},`; // date
      review += `${faker.lorem.sentence()},`; // review
      review += `${userId},`; // user_id
      review += `${Math.floor(randomRating(1, recordNumAThird + 1))}`; // location_id
      review += '\n';
      reviews_id = reviews_id + 1;
    }
  }
  return review;
};

const locations = (count) => {
  let location = '';
  const min = 1;
  for (let i = 1; i <= count; i++) {
    location += `${i},`; // location_id
    location += `${faker.lorem.words()},`; // title
    location += `${faker.address.streetAddress()},`; // address
    location += `${Math.floor(randomRating(min, recordNum))},`; // user_id
    location += `${i}`; // rating_id
    location += '\n';
  }
  return location;
};

const userInfo = (count) => {
  let user = '';
  for (let i = 1; i <= count; i++) {
    user += `${i},`; // user_id
    user += `${faker.name.firstName()},`; // first_name
    user += `${faker.name.lastName()},`; // last_name
    user += `${faker.internet.email()},`; // email
    user += `${faker.date.recent()},`; // join_date
    user += `${faker.image.avatar()},`; // image_url
    user += `${faker.address.city()},`; // city
    user += `${faker.address.state()}`; // state
    user += '\n';
  }
  return user;
};

exports.csvCreateTable = async (tableNames) => {
  const fooNames = [userInfo, rating, locations, reviews];

  tableNames.forEach((tableName, key) => {
    fs.writeFile(path.resolve(`${tableName}.csv`), fooNames[key](recordNum)).then(() => {
      log(`Success: ${tableName}.csv`);
    }).catch((err) => {
      log(`Error: ${err}`);
    });
  });
};

exports.rmCsv = async (tableNames) => {
  await tableNames.forEach((table) => {
    fs.unlink(path.resolve(`${table}.csv`), (err) => {
      if (err) {
        console.error('Error: ', err);
      }
    });
  });
};
