const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const user = require('../models/UserModel/');

// Get all Users 
const getAllUsers = async(req, res) =>{
    try {
        user.findAll()
            .then(users => {
                return res.json(users);
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

//Get user by name
const getUserByName = async(req, res) =>{
    try{
        await user.findAll({
            where:{
              FullName: {
                [Op.like]: `%${req.params.name}%`
              }
            }            
        })
        .then(user => {return res.json(user);})
        .catch(error => { console.log(`Error en la resupesta: ${error}`)});
    }
    catch(error){
        console.error(error);
    }
}

//Get user by id
const getUserById = async(req, res) =>{
    try {
       const user = await user.findByPk(req.body.id)
       if(!user){
            console.log('User not found')
            res.status(404)
       }else{
        return res.json(user)
       }
    } catch (error) {
        console.error(`Error FindById method: ${error}`);
    }
}

//Get user by Rol

//Create user
const createUser = async(req, res) => {
    try{
        user.create({
            FullName: req.body.FullName,
            DNI: req.body.DNI,
            Age: req.body.Age,
            Email: req.body.Email,
            Phone: req.body.Phone,
            Id_Rol: req.body.Id_Rol,
            Deleted: 0
        })
        .then( async () => {
            let Newuser = await user.findAll({ where: {
                FullName: req.body.FullName
            }});
            return res.json(Newuser[0]);
        })
        .catch( err => { console.log('Error while create user: ', err); })
    }
    catch(error){
        console.error('Error at method createUser');
    }
}

//Update user
const updateUser = async(req, res) => {
    try{
        user.update({ 
            FullName : req.body.FullName ?? req.body.FullName,
            DNI: req.body.DNI ?? req.body.DNI,
            Age: req.body.Age ?? req.body.Age ,
            Email: req.body.Email ?? req.body.Email,
            Phone: req.body.Phone ?? req.body.Phone,
            Id_Rol: req.body.Id_Rol ?? req.body.Id_Rol
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

//Delete user (Logico)
const deleteuser = async(req, res) => {
    try{
        let userDelete = user.findByPk(req.body.Id);

        if(!userDelete){
            console.log('user not found');
            return res.status(404);
        }
        user.update({
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
            (error)  => { console.log('Error while DELETE User ', error); }
        )
    }
    catch(error){
        console.error('Error DELETE method: ', error);
    }
}

module.exports = {
    getAllUsers,
    getUserByName,
    getUserById,
    updateUser,
    createUser,
    deleteuser
}