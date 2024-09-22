const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const role = require('../models/RoleModel/');

// Get all roles 
const getAllRoles = async(req, res) =>{
    try {
        role.findAll()
            .then(roles => {
                return res.json(roles);
            })
            .catch(error => {
                console.error('Error fetching roles:', error);
            });
    } catch (error) {
        res.status(400).send({
            code: "Bad request",
            error
        })        
    }
}

//Get rol by description
const getRolByDescription = async(req, res) =>{
    try{
        await role.findAll({
            where:{
              Description: {
                [Op.like]: `%${req.params.description}%`
              }
            } 
            
        })
        .then(rol => {return res.json(rol);})
        .catch(error => { console.log(`Error en la resupesta: ${error}`)});

    }
    catch(error){
        console.error(error);
    }
}

//Create Rol
const createRole = async(req, res) => {
    try{
        role.create({
            Description: req.body.Name,
            Deleted: 0
        })
        .then( async () => {
            let role = await role.findAll({ where: {
                Description: req.body.Description
            }});
            return res.json(role[0]);
        })
        .catch( err => { console.log('Error while create Role: ', err); })
    }
    catch(error){
        console.error('Error at method CreateRole');
    }
}

//Update Role
const updateRole = async(req, res) => {
    try{
        role.update({ 
            Description: req.body.Description ?? req.body.Description
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

//Delete Role (Logico)
const deleteRole = async(req, res) => {
    try{
        let roleDelete = role.findByPk(req.body.Id);

        if(!roleDelete){
            console.log('Role not found');
            return res.status(404);
        }

        role.update({
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
            (error)  => { console.log('Error while DELETE Role ', error); }
        )
    }
    catch(error){
        console.error('Error DELETE method: ', error);
    }
}

module.exports = {
    getAllRoles,
    getRolByDescription,
    updateRole,
    createRole,
    deleteRole
}