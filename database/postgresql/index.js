const {Pool} = require('pg');

const pool = new Pool({
  user: 'root',
  host: 'localhost',
  database: 'reviews',
  port: '5432',
});

module.exports = pool;
