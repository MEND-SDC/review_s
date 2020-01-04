const faker = require('faker');
const path = require('path');
const fs = require('fs').promises;

const recordNum = 10;
const recordNumAThird = Math.floor(recordNum / 3);

const randomRating = (min, max, precision) => Number.parseFloat(Math.random() * (max - min) + min).toPrecision(precision);

const rating = (count) => {
  var rates = '';
  const min = 2.98;
  const max = 5;
  const precision = 3;
  for (let i = 1; i <= count; i++) {
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
  var review = '';
  for (let userId = 1; userId <= count; userId++) {
    const reviewCount = Math.floor(randomRating(4, 9));
    for (let j = 0; j <= reviewCount; j++) {
      review += `${faker.date.recent()},`; // date
      review += `${faker.lorem.sentence()},`; // review
      review += `${userId},`; // user_id
      review += `${Math.floor(randomRating(1, recordNumAThird + 1))}`; // location_id
      review += '\n';
    }
  }
  return review;
};

const locations = (count) => {
  var location = '';
  const min = 1;
  for (let i = 1; i <= count; i++) {
    location += `${faker.lorem.words()},`; // title
    location += `${faker.address.streetAddress()},`; // address
    location += `${Math.floor(randomRating(min, recordNum))},`; // user_id
    location += `${i}`; // rating_id
    location += '\n';
  }
  return location;
};

const userInfo = (count) => {
  var user = '';
  for (let i = 0; i < count; i++) {
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

  tableNames.forEach(async (table, key) => {
    fs.writeFile(path.resolve(`${table}.csv`), fooNames[key](recordNum)).then(() => {
      console.log(`Success: ${table}.csv`);
    }).catch((err) => {
      console.log(`Error: ${err}`);
    });
  });
};

exports.rmTable = async (file) => {
  fs.unlink(path.resolve(`${file}.csv`), (err) => {
    if (err) {
      console.error('Error: ', err);
    }
  });
};