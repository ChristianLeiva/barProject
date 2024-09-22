const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../DataBase');


const User = sequelize.define('User', {
    Id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    FullName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    DNI:{
        type: DataTypes.INTEGER,
        allowNull:false,
        unique: true
    },
    Age:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Email:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    Phone:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    Id_Rol:{
        type: DataTypes.INTEGER,
        references:{
            model: 'Role',
            key: 'Id'
        }
    },
    Deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
},
{
    timestamps: true
});

module.exports = User;