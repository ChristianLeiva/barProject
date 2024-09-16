const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const Category = require('../Models/CategoryModel');
const menu = require('../Models/MenuModel');
const products = require('../Models/ProductModel');
const menuProduct = require('../Models/Menu_Product');

// INSERTAR MENU Y RELACION CON PRODUCTOS
const NewProduct = async(req, res) =>{
    try {
        menu.create({
            Id_Category: req.body.Id_Category,
            Name: req.body.Name,
            Price: req.body.Price,
            Description: req.body.Description,
            Img: req.body.Img,
            Deleted: 0
        })
            .then(async users => {
                let newMenu = await menu.findAll({where:{Name: { [Op.like]: req.body.Name }}});
                let productsId = req.body.ProductsId
                addProductsToMenu(newMenu[0].Id, productsId);
                return res.json(newMenu);
            })
            .catch(error => {
                console.error('Error creating menus:', error);
            });
    } catch (error) {
        res.status(400).send({
            code: "Bad request",
            error
        })        
    }
}

async function addProductsToMenu(menuId, productIds) { // <-- PASARLE EL ID DEL MENU Y ARRAY DE PRODUCTSID
    try {
        const dataMenu = await menu.findByPk(menuId);
        if (!dataMenu) {
            console.log('Menu not found');
            return;
        }

        await productIds.forEach(id => {
            menuProduct.create({ MenuId: dataMenu.Id, ProductId: id });
        });

        console.log('Products added to menu successfully');
    } catch (error) {
        console.error('Error adding products to menu:', error);
    }
}


// OBTENER TODOS
const GetAll = async(req, res) =>{
    try {
        menu.findAll()
            .then(menus => {
                return res.json(menus);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    } catch (error) {
        res.status(400).send({
            code: "Bad request",
            error
        })        
    }
}

// BUSCAR POR ID
const FindById = async(req, res) => {
    try{
        menu.findByPk(req.params.id).then(menu => {
            if(menu){
                return res.json(menu);
            }
            else{
                console.log('Menu not found');
            }
        })
    }
    catch(error){
        console.error(`Error FindById method: ${error}`);
    }
}

// BUSCAR POR NOMBRE -> Devuelve un valor o una lista de valores, dependiendo del nombre que pasamos
const FindByName = async (req, res) => {
    try{
        await menu.findAll({
            where:{
              Name: {
                [Op.like]: `%${req.params.name}%`
              }
            } 
            
        })
        .then(menuData => {return res.json(menuData);})
        .catch(error => { console.log(`Error en la resupesta: ${error}`)});

    }
    catch(error){
        console.log("error");
        console.error(error);
    }
}

// UPDATE
// const Update = async(req, res) => {
//     try{
//         menu.update({ 
//             Id_Category: 0,
//             Name: '',
//             Price: 0,
//             Description: '',
//             Img: '',
//          }, {
//             where: {
//                 id: req.param.id
//             }
//         })
//     }
//     catch(error){
//         console.error(`Error Update method`);
//     }
// }





module.exports = {NewProduct, GetAll, FindById, FindByName}