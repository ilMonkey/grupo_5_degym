const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const {validationResult} = require ('express-validator')
 
// Parse de Users
const rutaUsersJSON = path.join(__dirname, '../data/users.json');
let DataBaseJSON = fs.readFileSync(rutaUsersJSON, 'utf-8') || '[]';
let users = JSON.parse(DataBaseJSON);

// Parse de Branches
const branchesFilePath = path.join(__dirname, '../data/branches.json');
var branches = JSON.parse(fs.readFileSync(branchesFilePath, 'utf-8'));
branches = branches.filter(branch => branch.id < 7 );

const usersController = {
	// Login - Este metodo te lleva a la vista de Login
	login: (req,res) =>res.render('users/login',{branches}),

	// Create - Metodo que se usa en el GET para ir al formulario de register
	create: (req, res) => {
		res.render('users/register',{branches});
	},
	
	// Create -  Este metodo POST es para crear nuevos usuarios y que se guarden en la base de datos
	store: (req, res, next )=> {
		let newUser = {
			id: users.length + 1,
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			avatar : req.files[0].filename,
			email: req.body.email,
			gender: req.body.gender,
			birth_day: req.body.birth_day,
			mobile_number: req.body.mobile_number,
			password: bcrypt.hashSync(req.body.password, 10),
		}
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log(errors) 
			res.render('users/register',{errors, branches})
			//   return res.status(422).json({ errors: errors.array() });
		}else{
			let newDataBase = [...users, newUser]
			fs.writeFileSync(rutaUsersJSON, JSON.stringify(newDataBase,null, ' ') );
			res.redirect('/users/login')
		}
	},
		
	// Login - Este metodo es de autentificación del usuario
	auth: (req,res) => {
		let usuarioBuscado = users.find(usuario => req.body.email == usuario.email)//req.body.password == usuarioEncontrado.passsword pero hay un problema que se soluciona en el siguiente punto
		let autorizado = bcrypt.compareSync(req.body.password, usuarioBuscado.password) // El primer parametro es el string que quiero comparar y el segundo parametro es el hash contra el que lo quiero comparar
		if(autorizado){
		res.redirect('/')// En realidad res.redirect('/users/profile') pero es para testear que logea bien con el compare de bcrypt
		}else{
			res.render('users/login', {branches})
		}
	},

	profile: (req,res) => {
		let user = users.find(user => req.params.id == user.id)
		res.render('userProfile', {user, branches})
	},
	

	// Update - Form to edit
	edit: (req, res) => {
		let user = users.find(user => req.params.id == user.id)
		res.render('userProfileForm', {user, branches})
		console.log(user);
		
	},
	// Update - Method to update
	update: (req, res) => {
		
	},

	// Delete - Delete one user from DB
	destroy : (req, res) => {
		
	},

	// Delete - Delete one user from DB
	forgotPass : (req, res) => {
		res.render('users/resetPassword',{branches});
	}

};

module.exports = usersController;