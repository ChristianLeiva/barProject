const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../DataBase');

const MenuProducts = sequelize.define('MenuProducts', {
    Id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    MenuId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Menus',
            key: 'Id'
        },
        allowNull: false
    },
    ProductId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Products',
            key: 'Id'
        },
        allowNull: false
    },
});

module.exports = MenuProducts;