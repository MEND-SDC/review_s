const pool = require('../../database/postgresql/models/Reviews.js');

const rating = ({ id }, cb) => {
  const query = `SELECT * FROM rating WHERE id = ${id} LIMIT 1;`;

  pool.query(query, (err, { rows }) => {
    if (err) {
      cb(err);
    } else {
      cb(null, rows[0]);
    }
  });
};

const users = (id, cb) => {
  const query = `SELECT * FROM users WHERE id = ${id} LIMIT 1;`;

  pool.query(query, (err, { rows }) => {
    if (err) {
      cb(err);
    } else {
      cb(null, rows[0]);
    }
  });
};

const locations = ({ id }, cb) => {
  const query = `SELECT * FROM locations WHERE id = ${id} LIMIT 1;`;

  pool.query(query, (err, { rows }) => {
    if (err) {
      cb(err);
    } else {
      cb(null, rows[0]);
    }
  });
};

const reviews = ({ id }, cb) => {
  const query = `SELECT * FROM reviews WHERE locations_id = ${id}`;

  pool.query(query, (err, { rows }) => {
    if (err) {
      cb(err);
    } else {
      cb(null, rows);
    }
  });
};

exports.getListing = async (req, res) => {
  const id = req.params;

  locations(id, (err, locationData) => {
    if (err) {
      res.status(500).end('Failed to retrieve: Locations');
    } else {
      rating(id, (err, ratingData) => {
        if (err) {
          res.status(500).end('Failed to retrieve: Rating');
        } else {
          locationData.rating_id = ratingData;
          reviews(id, (err, reviewsData) => {
            if (err) {
              res.status(500).end('Failed to retrieve: Reviews');
            } else {
              res.status(200).send({ listing: locationData, reviews: reviewsData });
            }
          });
        }
      });
    }
  });
};
