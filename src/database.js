const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('library', 'root', '122503.Ahmet', {
    host: 'localhost',
    dialect: 'mysql',
    dialectOptions: {
        connectTimeout: 60000 // Bağlantı zaman aşımı süresi (ms)
    }
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
        console.log("Basarili");
        await sequelize.sync();
    } catch (error) {
        console.error('Başarısız', error);
    }
})();

module.exports = sequelize;
