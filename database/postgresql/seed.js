const faker = require('faker');
//const Model = require('./index.js');

const userCount = 20;

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

const userInfo = () => {
  for (let i = 0; i < userCount; i++) {
    let userID = undefined;
    const legalName = faker.fake('{{name.firstName}}, {{name.lastName}}');
    const DOB = faker.date.past();
    const emailAdress = faker.internet.email();
    const phoneNumber = faker.phone.phoneNumber();
    const joinDate = faker.date.recent();
    const imageUrl = faker.image.avatar();
    const userAddress = faker.fake('{{address.streetAddress}}, {{address.city}}, {{address.state}}, {{address.zipCode}}');
    const host = false;
    // At this moment want to seed database userInfo into DB and return USER ID
    // If i is equal to 5? want to create an host loaction
  }
};


reviews();