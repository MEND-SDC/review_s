const faker = require('faker');
//const Model = require('./index.js');

const userCount = 20;

const reviews = () => {

};

const location = (userID) => {
  const title = faker.lorem.words();
  const address = faker.fake('{{address.streetAddress}}, {{address.city}}, {{address.state}}, {{address.zipCode}}');
  const rating_id = rating();
  // 
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
    if (i % 4 === 0) {
      // User Rating
      reviews(userID);
    }
    if (i % 7 === 0) {
      // Location
      location(userID);
      // Update user to be a host:TRUE
    }
  }
};

