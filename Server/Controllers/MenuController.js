const Category = require('../Models/CategoryModel');
const menu = require('../Models/MenuModel');
const products = require('../Models/ProductModel');

// INSERTAR MENU Y RELACION CON PRODUCTOS
const NewProduct = async(req, res) =>{
    try {
        console.log(req);
        // menu.create({

        // })
        //     .then(users => {
        //         console.log('All users:', JSON.stringify(users, null, 2));
        //     })
        //     .catch(error => {
        //         console.error('Error fetching users:', error);
        //     });
        //addProductsToMenu();
    } catch (error) {
        res.status(400).send({
            code: "Bad request, entra",
            error
        })        
    }
}

async function addProductsToMenu(menuId, productIds) { // <-- PASARLE EL ID DEL MENU Y ARRAY DE PRODUCTSID
    try {
        const menu = await Menu.findByPk(menuId);

        if (!menu) {
            console.log('Menu not found');
            return;
        }

        const listProducts = await products.findAll({
            where: {
                id: productIds
            }
        });

        await menu.addProducts(products);

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
                console.log('All users:', JSON.stringify(menus, null, 2));
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





module.exports = {GetAll, FindById}