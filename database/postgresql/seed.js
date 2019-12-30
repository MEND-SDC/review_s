const {Pool} = require('pg');
const faker = require('faker');
const fs = require('fs').promises;


const userCount = 5;
const pool = new Pool({ database: 'reviews' });

pool.on('error', (err) => {
  if (err) {
    console.log(`Error: idle client: ${err}`);
  }
});

const randomRating = () => {
  let min = 2.5;
  let max = 5;
  return Number.parseFloat(Math.random() * (max - min) + min).toPrecision(3);
};

const reviews = () => {
  const postDate = faker.date.recent();
  const hostResponseDate = null;
  const hostResponse = null;
  const checkInRating = randomRating();
  const accuracyRating = randomRating();
  const valueRating = randomRating();
  const communicationRating = randomRating();
  const locationRating = randomRating();
  const cleanRating = randomRating();
  // Insert into reviews with user_id & location_id
};

const location = (userID) => {
  const title = faker.lorem.words();
  const address = faker.fake('{{address.streetAddress}}, {{address.city}}, {{address.state}}, {{address.zipCode}}');
  //Insert into location with user_id & loc_id & rating
};

const userInfo = async () => {
  for (let i = 0; i < userCount; i++) {
    const obj = {
      legal_name: faker.fake('{{name.firstName}}, {{name.lastName}}'),
      gender: undefined,
      date_of_birth: faker.date.past(),
      email_address: faker.internet.email(),
      phone_number: faker.phone.phoneNumber(),
      emergency_contact: undefined,
      join_date: faker.date.recent(),
      image_url: faker.image.avatar(),
      user_address: faker.fake('{{address.streetAddress}}, {{address.city}}, {{address.state}}, {{address.zipCode}}'),
      host: false,
    };

    console.log(obj);
    // At this moment want to seed database userInfo into DB and return USER ID
    // If i is equal to 5? want to create an host loaction
  }
};

const csvCreateTable = (creatTableInfo, recordNum, tableName) => {

};

const seedPostgres = async () => {
  const promises = [];


  console.log(start)
};

seedPostgres();
