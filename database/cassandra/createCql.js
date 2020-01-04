const path = require('path');
const log = require('fancy-log');
const fs = require('fs').promises;

const rows = [
  'user_id,first_name,last_name,email,join_date,image_url,city,state',
  'rating_id,rating_avg,checking_avg,accuracy_avg,value_avg,communication_avg,location_avg,cleanliness_avg',
  'locations_id,title,loc_address,user_id,rating_id',
  'reviews_id,review_date,review_text,user_id,locations_id',
];

exports.cqlCreate = async (tableNames) => {
  tableNames.forEach(async (table, key) => {
    const keyspace = `COPY ${table} (${rows[key]}) FROM '${path.resolve(`${table}.csv`)}' WITH DELIMITER=',' AND HEADER=TRUE;`;
    await fs.writeFile(path.resolve(`querie.${table}.cql`), keyspace)
      .then(() => {
        log(`Success: querie.${table}.cql`);
      }).catch((err) => {
        log(`Error: ${err}`);
      });
  });
};
