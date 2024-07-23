// backend/models/index.js
const sequelize = require('../config/database');
const User = require('./user');
const Event = require('./event');
const Registration = require('./registration');

const syncDb = async () => {
  try {
    await sequelize.sync();
    console.log('Database synced');
  } catch (error) {
    console.error('Unable to sync database:', error);
  }
};

module.exports = {
  User,
  Event,
  Registration,
  syncDb,
};
