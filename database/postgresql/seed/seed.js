const { Pool } = require('pg');
const path = require('path');
const log = require('fancy-log');

const pool = new Pool({ database: 'reviews' });

pool.on('error', (err) => {
  if (err) {
    console.log(`Error: idle client: ${err}`);
  }
});

const addQuery = async (tableName, rows) => (
  pool.connect()
    .then((client) => client.query(`COPY ${tableName}(${rows}) FROM '${path.join(__dirname, `/csv/${tableName}.csv`)}' DELIMITER ',';`)
      .then(() => {
        client.release();
        log(`Success: SEEDED ${tableName}`);
      }).catch((err) => {
        client.release();
        log(err.stack);
      }))
);

const seedPostgres = async () => {
  const tableNames = ['users', 'rating', 'locations', 'reviews'];
  const columns = [
    'first_name,last_name,email,join_date,city,state,image_url',
    'rating_avg,checking_avg,accuracy_avg,value_avg,communication_avg,location_avg,cleanliness_avg',
    'title,loc_address,users_id,rating_id',
    'first_name,review_date,review_text,users_id,locations_id,image_url',
  ];

  await addQuery(tableNames[0], columns[0]) // users
    .then(async () => {
      await addQuery(tableNames[1], columns[1]); // rating
    })
    .then(async () => {
      await addQuery(tableNames[2], columns[2]); // loctions
    })
    .then(async () => {
      await addQuery(tableNames[3], columns[3]); // reviews
    })
    .catch((err) => log(err));
};

seedPostgres();
