const path = require('path');
const log = require('fancy-log');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { client } = require('./index.js');
// const { csvCreateTable, rmCsv } = require('./generateData.js');
// const { cqlCreate } = require('./createCql.js');

const copyFrom = async (tableNames) => {
  // tableNames.forEach(async (table) => {
  //   const location = path.join(__dirname, `querie.${table}.cql`);
  //   await exec(`cqlsh -f ${location}`);
  // });
  const location = path.join(__dirname, `querie.${tableNames}.cql`);
  await exec(`cqlsh -f ${location}`);
};

const truncateTable = async (tableNames) => {
  // tableNames.forEach(async (table) => {
  //   await client.execute(`TRUNCATE ${table};`);
  // });
  await client.execute(`TRUNCATE ${tableNames};`)
    .then(() => {
      log(`TRUNCATE ${tableNames}`);
    }).catch((err) => console.log(err));
};

const seedCassandra = async () => {
  const tableNames = ['reviews.users', 'reviews.rating', 'reviews.locations', 'reviews.rev'];

  const start = new Date();
  const promises = [];
  // await csvCreateTable(tableNames)
  //   .then(async () => {
  //     await truncateTable(tableNames);
  //     await cqlCreate(tableNames);
  //     await copyFrom(tableNames);
  //   }).catch((err) => {
  //     console.error(err);
  //   });

  await truncateTable(tableNames[3])
    .then(async () => {
      await copyFrom(tableNames[3]);
    }).then(() => {
      log('Success: Seed');
    }).catch((err) => console.log(err));

 

  // Promise.all(promises).then(() => {
  //   log(`This query took ${new Date() - start} milliseconds`);
  // }).catch((error) => {
  //   log('Promise.all error', error.stack);
  // });
};

seedCassandra().catch(log);
