const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
console.log('starting awrsome app!!!!!');
// Built in middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      // 'https://heartfelt-meerkat-68db44.netlify.app',
      // 'http://localhost:5500',
      // 'http://127.0.0.1:5500',
      '*',
    ],
    credentials: true,
  })
);

// App routes
app.use('/api/v1/users', require('./controllers/users'));
app.use('/api/v1/todos', require('./controllers/todos'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
