// backend/models/event.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Registration = require('./registration'); // Asegúrate de importar Registration

const Event = sequelize.define('Event', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  latitude: {
    type: DataTypes.DECIMAL(9, 6),
    allowNull: false,
  },
  longitude: {
    type: DataTypes.DECIMAL(9, 6),
    allowNull: false,
  },
  cost: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'cancelled', 'completed'),
    defaultValue: 'active',
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  guest: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
// Definir la asociación con User y establecer el alias 'createdByUser'
Event.belongsTo(User, {
  foreignKey: 'createdBy',
  as: 'createdByUser', // Alias para la relación con el usuario que creó el evento
});

User.hasMany(Event, { foreignKey: 'createdBy' });
Event.belongsTo(User, { foreignKey: 'createdBy' });
Event.hasMany(Registration, { foreignKey: 'eventId' });

module.exports = Event;