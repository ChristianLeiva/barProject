require('dotenv').config();

const express = require('express');
const app = express();
const initializeDatabase = require('./DBInit');
const port = process.env.PORT;

const dataTest = require('../DataTest');

//========================= ROUTERS ==============================
const routerMenu = require('./Routes/MenuRoute');
const routerProduct = require('./Routes/ProductRoute');
const routerCategory = require('./Routes/CategoryRoute');
//================================================================


app.use(express.urlencoded({ extended: false }));
app.use(express.json())

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

app.use('/Menu', routerMenu);
app.use('/Product', routerProduct);
app.use('/Category', routerCategory);

//=========================== INICIO EL SERVIDOR ============================
startServer();

//dataTest(); //CARGA DATOS DE PRUEBA