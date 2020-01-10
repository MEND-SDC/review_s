const faker = require('faker');
const path = require('path');
const fs = require('fs').promises;
const log = require('fancy-log');

const recordNum = 500000;
const recordNumAThird = Math.floor(recordNum / 3);

const randomRating = (min, max, precision) => Number.parseFloat(Math.random() * (max - min) + min).toPrecision(precision);

const reviews = () => {
  var review = '';
  for (let userId = 1; userId <= recordNum; userId++) {
    const reviewCount = Math.floor(randomRating(8, 10));
    for (let j = 0; j <= reviewCount; j++) {
      review += `${faker.name.firstName()},`; // first_name
      review += `${faker.date.recent()},`; // date
      review += `${faker.lorem.sentence()},`; // review
      review += `${userId},`; // user_id
      review += `${Math.floor(randomRating(1, recordNumAThird + 1))},`; // location_id
      review += `${faker.image.avatar()}`; // image_url
      review += '\n';
    }
  }
  return review;
};

const csvCreateTable = async () => {
  await fs.writeFile(path.join(__dirname, '/csv/reviews.csv'), reviews()).then(() => {
    log('Success: reviews.csv');
  }).catch((err) => {
    log(`Error: ${err}`);
  });
};

csvCreateTable();
