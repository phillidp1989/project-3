require('dotenv').config();

module.exports = {
  db: {
    uri: process.env.MONGO_URI
  },
  express: {
    port: process.env.PORT || 5000
  },
  cookie: {
    key: process.env.SECRET_KEY
  }
};
