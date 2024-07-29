const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./user');
const Book = require('./book');

const Borrow = sequelize.define('Borrow', {
    id: {
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    bookId: {
        type: DataTypes.INTEGER,
        references: {
            model: Book,
            key: 'id'
        }
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    borrowedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    returnedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
});


module.exports = Borrow;