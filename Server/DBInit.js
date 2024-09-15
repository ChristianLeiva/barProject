const {sequelize} = require('./Models/Associations'); 

const initializeDatabase = async () => {
    try {
        await sequelize.sync({ alter: false });
        console.log('========================================================')
        console.log('|  Base de datos y modelos sincronizados correctamente  |');
        console.log('========================================================')
    } catch (error) {
        console.error('Error al sincronizar la base de datos:', error);
    }
};

module.exports = initializeDatabase;
