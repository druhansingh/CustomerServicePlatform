const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Middleware
app.use(bodyParser.json());
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/api/request', require('./routes/request'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
