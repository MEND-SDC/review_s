const path = require('path');
const log = require('fancy-log');
const faker = require('faker');
const fs = require('fs').promises;
const { client } = require('./index.js');

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

const csvCreateTable = async (creatTableInfo, tableName) => {
  fs.writeFile(path.resolve(`${tableName}.csv`), creatTableInfo(recordNum)).then(() => {
    log(`Success: ${tableName}.csv`);
  }).catch((err) => {
    log(`Error: ${err}`);
  });
};

const rmTable = async (tableName) => {
  fs.unlink(path.resolve(`${tableName}.csv`), (err) => {
    if (err) {
      console.error('Error: ', err);
    }
  });
};

// const addQuery = async (tableName, rows) => (
//   // pool.connect()
//   //   .then(async (client) => client.query(`COPY ${tableName}(${rows}) FROM '${path.resolve(`${tableName}.csv`)}' DELIMITER ',';`)
//   //     .then((res) => {
//   //       client.release();
//   //       console.log(`Success: SEEDED ${tableName}`);
//   //     }).catch((err) => {
//   //       client.release();
//   //       console.log(err.stack);
//   //     }))
//   //await client.execute();
// );

const seedPostgres = async () => {
  const tableNames = ['reviews.users', 'reviews.rating', 'reviews.locations', 'reviews.rev'];
  const tableDeclaration = [userInfo, rating, locations, reviews];
  const start = new Date();
  const promises = [];
  
  tableNames.forEach(async (tableName, key) => {
    await client.execute(`TRUNCATE ${tableName};`);
    log(`TRUNCATED: ${tableName}`);
    await csvCreateTable(tableDeclaration[key], tableName);
  });

  // promises.push(await addQuery(tableNames.users, 'first_name,last_name,email,join_date,image_url,city,state'));
  // promises.push(await addQuery(tableNames.rating, 'rating_avg,checking_avg,accuracy_avg,value_avg,communication_avg,location_avg,cleanliness_avg'));
  // promises.push(await addQuery(tableNames.locations, 'title,loc_address,users_id,rating_id'));
  // promises.push(await addQuery(tableNames.reviews, 'review_date,review_text,users_id,locations_id'));
  
  // await rmTable(tableNames.users);
  // await rmTable(tableNames.rating);
  // await rmTable(tableNames.locations);
  // await rmTable(tableNames.reviews);

  // Promise.all(promises).then(() => {
  //   console.log(`This query took ${new Date() - start} milliseconds`);
  // }).catch((error) => {
  //   console.error('Promise.all error', error.stack);
  // });
};



// const util = require('util');
// const exec = util.promisify(require('child_process').exec);

// const copyToDb = async () => {
//   const location = path.resolve(__dirname, 'queries.cql');
//   log(location);
//   return exec(`cqlsh -u cassandra -p cassandra -f ./server/db/cassandra/queries.cql`, { maxBuffer: 5000*1024 }); //--debug -e '${query}'`).catch(log);
// }

// const seed = async () => {
//   await client.(`TRUNCATE camelot_earnings.stock;`);
//   log('existing tables truncated');
//   await copyToDb();
//   log('all data seeded');
// }

// seed().catch(log);

seedPostgres().catch(log);
