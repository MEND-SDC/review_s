const {Pool} = require('pg');
const path = require('path');
const { csvCreateTable, rmTable } = require('./generateDate.js');

const pool = new Pool({ database: 'reviews' });

pool.on('error', (err) => {
  if (err) {
    console.log(`Error: idle client: ${err}`);
  }
});

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
  const tableNames = ['users', 'rating', 'locations', 'reviews'];
  const columns = [
    'first_name,last_name,email,join_date,image_url,city,state',
    'rating_avg,checking_avg,accuracy_avg,value_avg,communication_avg,location_avg,cleanliness_avg',
    'title,loc_address,users_id,rating_id',
    'review_date,review_text,users_id,locations_id',
  ];

  await csvCreateTable(tableNames);

  tableNames.forEach(async (table, key) => {
    promises.push(await addQuery(table, columns[key])
      .then(() => {
        rmTable(table);
      }).catch((err) => {
        console.error(err);
      }));
  });
};

seedPostgres();
