
const faker = require('faker');
//const {Client} = require('pg');
//const client = new Client();

const userCount = 10;

const userInfo = () => {
  for (let i = 0; i < userCount; i++) {
    const legalName = faker.fake('{{name.firstName}}, {{name.lastName}}');
    const DOB = faker.date.past();
    const emailAdress = faker.internet.email();
    const phoneNumber = faker.phone.phoneNumber();
    const joinDate = faker.date.recent();
    const imageUrl = faker.image.avatar();
    const userAddress = faker.fake('{{address.streetAddress}}, {{address.city}}, {{address.state}}, {{address.zipCode}}');
  }
};

const review = () => {

}

userInfo();
