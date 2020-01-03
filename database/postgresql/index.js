const {Pool} = require('pg');
const config = require('../../config/psql.config.js');

const pool = new Pool({
  host: config.host,
  user: config.user,
  database: config.database,
  password: config.password,
  port: config.port,
});

pool.connect();

module.exports = pool;
