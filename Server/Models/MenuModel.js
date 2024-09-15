const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../DataBase');

const Menu = sequelize.define('Menus', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Id_Category: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Categories',
            key: 'Id'
        }
    },
    Name: {
        type: DataTypes.STRING,
        unique: true
    },
    Price: {
        type: DataTypes.DOUBLE
    },
    Description: {
        type: DataTypes.STRING
    },
    Img: {
        type: DataTypes.STRING
    },
    Deleted: {
        type: DataTypes.BOOLEAN
    }
},
{
    timestamps: true
}
);

module.exports = Menu;