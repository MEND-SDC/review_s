const path = require('path');
const fs = require('fs').promises;
const log = require('fancy-log');

const recordNum = 1000000;

const randomRating = (min, max, precision) => Number.parseFloat(Math.random() * (max - min) + min).toPrecision(precision);

const rating = () => {
  var rates = '';
  const min = 2.98;
  const max = 5;
  const precision = 3;
  for (let i = 1; i <= recordNum; i++) {
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

const csvCreateTable = async () => {
  await fs.writeFile(path.join(__dirname, '/csv/rating.csv'), rating()).then(() => {
    log('Success: rating.csv');
  }).catch((err) => {
    log(`Error: ${err}`);
  });
};

csvCreateTable();
