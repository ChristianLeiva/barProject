const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../DataBase');

const Category = sequelize.define('Categories', {
    Id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Description: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    Deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
},
{
    timestamps: true
});

module.exports = Category;