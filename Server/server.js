require('dotenv').config();

const express = require('express');
const app = express();
const initializeDatabase = require('./DBInit');
const port = process.env.PORT;

const dataTest = require('../DataTest');

//========================= ROUTERS ==============================
const menu = require('./Routes/MenuRoute');
//================================================================


app.use(express.urlencoded({ extended: false }));

const startServer = async () => {
    try{
        await initializeDatabase();

        app.listen(port, (req, res) => {
            console.log(`Servidor funcionando en el puerto ${port}`)
        })
    }
    catch(error){
        console.error(`Error al sincronizar la base de datos ${error}`)
    }
}
app.get('/',(req, res) => {
    res.send("PAGINA DE INICIO");
})

app.use('/Menu', menu);


//=========================== INICIO EL SERVIDOR ============================
startServer();

//dataTest(); //CARGA DATOS DE PRUEBA