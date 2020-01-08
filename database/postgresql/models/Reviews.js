const { Pool } = require('pg');

const pool = new Pool({ database: 'reviews' });

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;
