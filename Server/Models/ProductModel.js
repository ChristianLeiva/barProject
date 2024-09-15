const sequelize = require('../DataBase');
const { DataTypes, Sequelize } = require('sequelize');

const Product = sequelize.define('Products', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    Stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
},
{
    timestamps: true
});

module.exports = Product;