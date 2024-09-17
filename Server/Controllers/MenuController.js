const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const category = require('../Models/CategoryModel');
const menu = require('../Models/MenuModel');
const products = require('../Models/ProductModel');
const menuProduct = require('../Models/Menu_Product');

//#region MENU (CREATE, GETALL, FINDBYID, FINDBYNAME, UPDATE, DELETE)

// INSERTAR MENU Y RELACION CON PRODUCTOS
const NewMenu = async(req, res) =>{
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
        let condition = { Deleted: false };
        if(req.params.Id_Category){
            condition.Id_Category =  req.params.Id_Category;
        }
        menu.findAll({
            where: condition
        })
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

const GetAllADMIN = async(req, res) =>{
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
        console.error(error);
    }
}

// UPDATE
const Update = async(req, res) => {
    try{
        menu.update({ 
            Id_Category: req.body.Id_Category ?? req.body.Id_Category,
            Name: req.body.Name ?? req.body.Name,
            Price: req.body.Price ?? req.body.Price,
            Description: req.body.Description ?? req.body.Description,
            Img: req.body.Img ?? req.body.Img,
         }, {
            where: {
                Id: req.body.Id
            }
        })
        .then( () =>
            { return res.status(200); }
        );
    }
    catch(error){
        console.error(`Error UPDATE method ${error}`);
    }
}

// DELETE (LOGICO)
const Delete = async(req, res) => {
    try{
        let menuDelete = menu.findByPk(req.body.Id);

        if(!menuDelete){
            console.log('Menu not found');
            return res.status(404);
        }

        menu.update({
            Deleted : 1
        },{
            where:{
                Id: req.body.Id
            }
        })
        .then(
            () => { return res.status(200); }
        )
        .catch(
            (error)  => { console.log('Error while DELETE menu ', error); }
        )
    }
    catch(error){
        console.error('Error DELETE method: ', error);
    }
}

//#endregion


//#region PRODUCT ()

const NewProduct = async(req, res) => {
    try{
        products.create({
            Name: req.body.Name,
            Stock: req.body.Stock,
            Deleted: 0
        })
        .then( async () => {
            let product = await products.findAll({ where: {
                Name: req.body.Name
            }});
            return res.json(product[0]);
        })
        .catch( err => { console.log('Error while create Product: ', err); })
    }
    catch(error){
        console.error('Error at method NEWPRODUCT');
    }
}

const GetAllProductsADMIN = async (req, res) => {
    try{
        products.findAll()
        .then( (listProducts) => {
            return res.json(listProducts);
        })
        .catch(err => { console.log('Products not found ', err); }) 
    }
    catch(error){
        console.error('Error at GETALLPRODUCTS method');
    }
}

const GetAllProducts = async (req, res) => {
    try{
        products.findAll({
            where: {
                Deleted: 0
            }
        })
        .then( (listProducts) => {
            return res.json(listProducts);
        })
        .catch(err => { console.log('Products not found ', err); }) 
    }
    catch(error){
        console.error('Error at GETALLPRODUCTS method');
    }
}

const GetAllNullStock = async (req, res) => {
    try{
        products.findAll({
            where:{
                Stock: 0
            }
        })
        .then(list => {
            return res.json(list);
        })
        .catch(err => {
            console.log('Error attempt FIND 0 STOCK PRODUCTS: ', err);
        })
    }
    catch(error){
        console.error('Error at GETALL0STOCK method: ', error);
    }
}

const GetProductById = async (req, res) => {
    try{
        products.findByPk(req.params.Id)
        .then(prod => {
            return res.json(prod);
        })
        .catch( err => {
            console.log('Product not found ', err);
        })
    }
    catch(error){
        console.error('Error at GETPRODUCTBYID method');
    }
}

const UpdateProduct = async (req, res) => {
    try{
        products.update({
            Name: req.body.Name ?? req.body.Name,
            Stock: req.body.Stock ?? req.body.stock
        },{
            where: {
                Id: req.body.Id
            }
        })
        .then( async () => {
            return res.json(await products.findByPk(req.body.Id));
        })
        .catch(err => {
            console.log('Error attempt Update product')
        })
    }
    catch(error){
        console.error('Error at UPDATEPRODUCT method');
    }
}

const DeleteProduct = async (req, res) => {
    try{
        products.update({
            Deleted: true
        },{
            where: {
                Id: req.body.Id
            }
        })
        .then( () => {
            return res.status(200);
        }) 
        .catch(err => {
            console.log('Product not found to DELETE');
        })
    }
    catch(error){
        console.error('Error at DELETEPRODUCT method ', error);
    }
}

//#endregion


//#region CATEGORY

const NewCategory = async (req, res) => {
    try{
        category.create({
            Description: req.body.Description,
            Deleted: 0
        })
        .then( async () => {
            let listCategory = await category.findAll();
            return res.json(listCategory);
        })
        .catch( err => {
            console.log('Error attempt create CATEGORY ', err);
        })
    }
    catch(error){
        console.error('Error at NEWCATEGORY method ', error);
    }
}

const GetAllCategories = async (req, res) => {
    try{
        category.findAll({
            where: {
                Deleted: 0
            }
        })
        .then( list => {
            return res.json(list);
        })
        .catch(err => {
            console.log('Error can not get CATEGORIES: ', err);
        })
    }
    catch(error){
        console.error('Error at GETALLCATEGORIES method: ', error);
    }
}

const GetAllCategoriesADMIN = async (req, res) => {
    try{
        category.findAll()
        .then( list => {
            return res.json(list);
        })
        .catch(err => {
            console.log('Error can not get CATEGORIES: ', err);
        })
    }
    catch(error){
        console.error('Error at GETALLCATEGORIES method: ', error);
    }
}

const UpdateCategory = async (req, res) => {
    try{
        category.update({
            Description: req.body.Description ?? req.body.Description
        },{
            where: {
                Id: req.body.Id
            }
        })
        .then( async () => {
            let categories = await category.findAll();
            return res.json(categories);
        })
        .catch(err => {
            console.log('Category not found: ', err);
        })
    }
    catch(error){
        console.error('Error at UPDATECATEGORY method: ', error);
    }
}

const DeleteCategory = async (req, res) => {
    try{
        category.update({
            Deleted: true
        },{
            where: {
                Id: req.body.Id
            }
        })
        .then(async () => {
            let categories = await category.findAll();
            return res.json(categories);
        })
        .catch(err => {
            console.log('Category not found: ', err);
        })
    }
    catch(error){
        console.error('Error at DELETECATEGORY method: ', error);
    }
}

//#endregion


module.exports = {
    // MENU
    NewMenu, GetAll, FindById, FindByName, Update, Delete, 
    // PRODUCT
    NewProduct, GetAllProducts, GetAllNullStock, GetProductById, UpdateProduct, DeleteProduct,
    // CATEGORY
    NewCategory, GetAllCategories, UpdateCategory, DeleteCategory,
    // ADMIN
    GetAllADMIN, GetAllProductsADMIN, GetAllCategoriesADMIN
}