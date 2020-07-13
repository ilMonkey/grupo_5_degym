const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const {validationResult} = require ('express-validator')
const {check} = require ('express-validator')
const usersFilePath = './src/data/users.json';
const DB = require ('../database/models');
const OP = DB.Sequelize.Op;

// Parse de Users
const rutaUsersJSON = path.join(__dirname, '../data/users.json');
let DataBaseJSON = fs.readFileSync(rutaUsersJSON, 'utf-8') || '[]';
let users = JSON.parse(DataBaseJSON);

// Parse de Branches
// const branches = await DB.Branch.findAll()

// Funciones customisadas
function traerTodosLosUsuarios(){
	let usersFileContent = fs.readFileSync(usersFilePath, 'utf-8');
	let usuarios = usersFileContent != '' ? JSON.parse(usersFileContent) : []; // Si el contenido de userFileContent es distinto de nada, entonces parsealo
	return usuarios
};

function traerUsuarioPorEmail(userEmail) {
	let todosLosUsuarios = traerTodosLosUsuarios();
	let elUsuario = todosLosUsuarios.find(unUsuario => unUsuario.email == userEmail);
	return elUsuario;
}

const usersController = { 
	// Login - Este metodo te lleva a la vista de Login
	login: (req,res) =>res.render('users/login'),

	// Create - Metodo que se usa en el GET para ir al formulario de register
	create: (req, res) => {
		res.render('users/register');
	},
	
	// Create -  Este metodo POST es para crear nuevos usuarios y que se guarden en la base de datos
	store: async (req, res) => {
		// let validation = validationResult(req);
		// let errors = validation.errors
		// if (errors != '') {
		// 	console.log(errors) 
		// 	res.render('users/register',{errors, branches}) 
		// }else{
		// 	try {
		// 		req.body.password = bcrypt.hashSync(req.body.password, 10)
		// 		const newUser = await DB.User.create(req.body)
		// 		res.send(newUser)
		// 		res.redirect('/users/login')
		// 	} catch (error) {
		// 		res.send(error)
		// 	}
		// }
	},

	// Login - Este metodo es de autentificación del usuario, session y cookies EXPLICADO!!!
	auth: (req,res) => {
		
	},

	// Profile - Metodo que te lleva al profile con la info del usuario logeado
	profile: (req,res) => {
		
	},

	// Logout - Metodo para deslogearse
	logout: (req, res) => {
		
	},

	// Update - Form to edit
	edit: (req, res) => {
		
	},

	// Update - Method to update
	update: (req, res) => {
		
	},

	// Delete - Delete one user from DB
	destroy : (req, res) => {
		
	},

	// Delete - Delete one user from DB
	forgotPass : (req, res) => {
		
	}

};

module.exports = usersController;