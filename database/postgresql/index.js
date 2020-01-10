const { Pool } = require('pg');
const { config } = require('../../config/config.js');

const pool = new Pool({
  user: 'power_user',
  password: config.password,
  host: config.host,
  database: 'reviews',
  port: config.port,
});

module.exports = pool;
