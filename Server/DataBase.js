require('dotenv').config();
const { Sequelize } = require('sequelize');


const sequelize = new Sequelize(process.env.DB_DBNAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_SERVER,
    dialect: 'mssql',
    dialectModule: require('tedious'),
    logging: false, 
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});


const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('========================================================')
        console.log('| Conexión a la base de datos establecida correctamente |');
        console.log('========================================================')
    } catch (error) {
        console.log('========================================================')
        console.error('|    No se pudo conectar a la base de datos:', error);
        console.log('========================================================')
    }
};

testConnection();

module.exports = sequelize;
