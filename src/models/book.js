const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Book = sequelize.define('Book', {
    name: {
        type: DataTypes.STRING,
        allowNNull: false
    },
    averageScore: {
        type: DataTypes.FLOAT,
        defaultValue: -1
    }
});

module.exports = Book;
