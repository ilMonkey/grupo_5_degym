const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const {validationResult} = require ('express-validator')

// Parse de Users
const rutaUsersJSON = path.join(__dirname, '../data/users.json');
let DataBaseJSON = fs.readFileSync(rutaUsersJSON, 'utf-8') || '[]';
let users = JSON.parse(DataBaseJSON);

// Parse de Branches
const branchesFilePath = path.join(__dirname, '../data/branchesDataBase.json');
var branches = JSON.parse(fs.readFileSync(branchesFilePath, 'utf-8'));
branches = branches.filter(branch => branch.id < 7 );

const usersController = {
	// Login - Este metodo te lleva a la vista de Login
	login: (req,res) =>res.render('login',{branches}),

	// Create - Metodo que se usa en el GET para ir al formulario de register
	create: (req, res) => {
		res.render('register',{branches});
	},
	
	// Create -  Este metodo POST es para crear nuevos usuarios y que se guarden en la base de datos
	store: (req, res, next )=> {
		let newUser = {
			id: users.length + 1,
			first_name: req.body.first_name,
			sub_name: req.body.sub_name,
			picture_profile : req.files[0].filename,
            email: req.body.email,
			password: bcrypt.hashSync(req.body.password, 10),
			// sub_password: req.body.sub_password
		}
		let newDataBase = [...users, newUser]
			fs.writeFileSync(rutaUsersJSON, JSON.stringify(newUser,null, ' ') );
			res.redirect('/users/login')
	},
		
	// Login - Este metodo es de autentificación
	auth: (req,res) => {
		// Tener en cuenta en el find que busca por array, asiq si en la DB no es un array no lo va a encontrar
		let usuarioEncontrado = users.find(usuario => req.body.email == usuario.email)//req.body.password == usuarioEncontrado.passsword pero hay un problema que se soluciona en el siguiente punto
		let autorizado = bcrypt.compareSync(req.body.password, usuarioEncontrado.password) // El primer parametro es el string que quiero comparar y el segundo parametro es el hash contra el que lo quiero comparar
		if(autorizado){
		res.redirect('/')
		// En realidad res.redirect('/users/profile') pero es para testear que logea bien con el compare de bcrypt
		}else{
			res.render('login', {error: "credenciales invalidas"})
	}
	},

	profile: (req,res) => res.render('profile', {users}), 

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
		res.render('resetPassword',{branches});
	}

};

module.exports = usersController;