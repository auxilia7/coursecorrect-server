const express = require('express');
const subjects = require('../routes/subjects');
const customers = require('../routes/customers');
const courses = require('../routes/courses');
const users = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middleware/error');

module.exports = function(app) {
  app.use(express.json());
  app.use('/api/subjects', subjects);
  app.use('/api/customers', customers);
  app.use('/api/courses', courses);
  app.use('/api/users', users);
  app.use('/api/auth', auth);
  app.use(error);
}