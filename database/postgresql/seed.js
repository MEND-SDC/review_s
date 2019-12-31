const {Pool} = require('pg');
const faker = require('faker');
const fs = require('fs').promises;
const path = require('path');

const recordNum = 10;
const recordNumAThird = Math.floor(recordNum / 3);
const pool = new Pool({ database: 'reviews' });

pool.on('error', (err) => {
  if (err) {
    console.log(`Error: idle client: ${err}`);
  }
});

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

const csvCreateTable = (creatTableInfo, recordNum, tableName) => {
  fs.writeFile(path.resolve(`${tableName}.csv`), creatTableInfo(recordNum)).then(() => {
    console.log(`Success: ${tableName}.csv`);
  }).catch((err) => {
    console.log(`Error: ${err}`);
  });
};

const addQuery = async (tableName, rows) => (
  pool.connect()
    .then(async (client) => client.query(`COPY ${tableName}(${rows}) FROM '${path.resolve(`${tableName}.csv`)}' DELIMITER ',';`)
      .then((res) => {
        client.release();
        console.log(`Success: SEEDED ${tableName}`);
      }).catch((err) => {
        client.release();
        console.log(err.stack);
      }))
);

const seedPostgres = async () => {
  const start = new Date();
  const promises = [];
  await csvCreateTable(userInfo, recordNum, 'users');
  await csvCreateTable(rating, recordNumAThird, 'rating');
  await csvCreateTable(locations, recordNumAThird, 'locations');
  await csvCreateTable(reviews, recordNum, 'reviews');

  promises.push(await addQuery('users', 'first_name,last_name,email,join_date,image_url,city,state'));
  promises.push(await addQuery('rating', 'rating_avg,checking_avg,accuracy_avg,value_avg,communication_avg,location_avg,cleanliness_avg'));
  promises.push(await addQuery('locations', 'title,loc_address,users_id,rating_id'));
  promises.push(await addQuery('reviews', 'review_date,review_text,users_id,locations_id'));

  Promise.all(promises).then(() => {
    console.log(`This query took ${new Date() - start} milliseconds`);
  }).catch((error) => {
    console.error('Promise.all error', error.stack);
  });
};

seedPostgres();
