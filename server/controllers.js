const Models = require('./models.js');

module.exports = {
  getListing: (id, res) => {
    Models.getListing((err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        console.log(data.stats[0]);
        res.status(200).send(data);
      }
    }, id);
  },
};
