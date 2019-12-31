const {Pool} = require('pg');
const faker = require('faker');
const fs = require('fs').promises;
const path = require('path');

const pool = new Pool({ database: 'reviews' });

pool.on('error', (err) => {
  if (err) {
    console.log(`Error: idle client: ${err}`);
  }
});

const randomRating = () => {
  let min = 2.98;
  let max = 5;
  return Number.parseFloat(Math.random() * (max - min) + min).toPrecision(3);
};

const rating = (count) => {
  var rates = '';
  for (let i = 0; i < count; i++) {
    rates += `${randomRating()},`;
    rates += `${randomRating()},`;
    rates += `${randomRating()},`;
    rates += `${randomRating()},`;
    rates += `${randomRating()},`;
    rates += `${randomRating()},`;
    rates += `${randomRating()}`;
    rates += '\n';
  }
  return rates;
};

const reviews = (count) => {
  var review = '';
  for (let i = 0; i < count; i++) {
    review += `${faker.date.recent()},`; // date
    review += `${faker.lorem.sentences()}`; // review
    review += '\n';
  }
  return review;
};

const locations = (count) => {
  var location = '';
  for (let i = 0; i <= count; i++) {
    location += `${faker.lorem.words()},`; // title
    location += `${faker.fake('{{address.streetAddress}}, {{address.city}}, {{address.state}}, {{address.zipCode}}')}`; // address
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
    user += `${faker.address.state()},`; // state
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

const seedPostgres = async () => {
  const start = new Date();
  const promises = [];
  await csvCreateTable(userInfo, 10, 'users');

  promises.push(
    pool.connect()
      .then(async (client) => client.query(`COPY users(first_name,last_name,email,join_date,image_url,city,state) FROM '${path.resolve('users.csv')}' DELIMITER ',';`)
        .then((res) => {
          client.release();
        }).catch((err) => {
          client.release();
          console.log(err.stack);
        })),
  );
  Promise.all(promises).then(() => {
    console.log(`This query took ${new Date() - start} milliseconds`);
  }).catch((error) => {
    console.error('Promise.all error', error.stack);
  });
};


seedPostgres();
