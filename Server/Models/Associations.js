const sequelize = require('../DataBase');

const Menu = require('./MenuModel');
const Product = require('./ProductModel');
const Category = require('./CategoryModel');
const MenuProducts = require('./Menu_Product');

const Rol = require('./RoleModel');
const User = require('./UserModel');

// RELACION MUCHOS A UNO: UNA CATEGORIA TIENE MUCHOS MENUS
Menu.belongsTo(Category, {
    foreignKey: 'Id_Category', 
    as: 'category'
});
Category.hasMany(Menu, {
    foreignKey: 'Id_Category',
    as: 'menus'
});

// MUCHOS  A MUCHOS: MENU-PRODUCTO
Product.belongsToMany(Menu, { through: MenuProducts });
Menu.belongsToMany(Product, { through: MenuProducts });

//Hacer relacion de usuarios a rol
/*
User.belongsto(Rol, {
    ForeignKey: 'Id_Rol', 
    as: 'Role' 
});
Rol.hasMany(User, {
    foreignKey: 'Id_Rol',
    as: 'User'
});
*/

module.exports = { Menu, Product, Category, MenuProducts, sequelize };