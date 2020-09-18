const mongoose = require('mongoose');
const app = require('./app');

// Establish .env variables
const dotenv = require('dotenv');
dotenv.config({ path: `${__dirname}/config.env` });

// Connect MongoDB
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('-- Database connected --');
  });

const PORT = process.env.PORT || 1337;

// Create Server
app.listen(PORT, () => {
  console.log(`-- Listening on port: ${PORT} --`);
});
