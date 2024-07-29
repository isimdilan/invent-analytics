const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('library', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql'
});

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const Book = sequelize.define('Book', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    averageScore: {
        type: DataTypes.FLOAT,
        defaultValue: -1
    }
});

const Borrow = sequelize.define('Borrow', {
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

User.hasMany(Borrow, { foreignKey: 'userId' });
Book.hasMany(Borrow, { foreignKey: 'bookId' });
Borrow.belongsTo(User, { foreignKey: 'userId' });
Borrow.belongsTo(Book, { foreignKey: 'bookId' });

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection successful");
        await sequelize.sync();
    } catch (error) {
        console.error('Connection failed', error);
    }
})();

module.exports = sequelize;
