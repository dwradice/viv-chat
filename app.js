const express = require('express');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const path = require('path');

const userRouter = require('./routes/userRoutes');
const messageRouter = require('./routes/messageRoutes');
const roomRouter = require('./routes/roomRoutes');

// Init Express
const app = express();

// Set Security HTTP Headers
app.use(helmet());

// Body parser, reading data from body
app.use(
  express.json({
    limit: '10kb',
  })
);

// Cookie parser
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data Sanitization against XSS
app.use(xss());

// Compression
app.use(compression());

// Routing
app.use('/api/users', userRouter);
app.use('/api/messages', messageRouter);
app.use('/api/rooms', roomRouter);

// Serve Static Assets
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

module.exports = app;
