const Sequelize = require('sequelize');

const sequelize = new Sequelize("postgres://postgres:Password1@localhost:5432/workoutServer");

module.exports = sequelize;