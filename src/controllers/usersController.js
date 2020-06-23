const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const {validationResult} = require ('express-validator')
const usersFilePath = './src/data/users.json';
 
// Parse de Users
const rutaUsersJSON = path.join(__dirname, '../data/users.json');
let DataBaseJSON = fs.readFileSync(rutaUsersJSON, 'utf-8') || '[]';
let users = JSON.parse(DataBaseJSON);

// Parse de Branches
const branchesFilePath = path.join(__dirname, '../data/branches.json');
var branches = JSON.parse(fs.readFileSync(branchesFilePath, 'utf-8'));
branches = branches.filter(branch => branch.id < 7 );

// Funciones customisadas
function traerTodosLosUsuarios(){
	let usersFileContent = fs.readFileSync(usersFilePath, 'utf-8');
	let usuarios = usersFileContent != '' ? JSON.parse(usersFileContent) : [];
	return usuarios
};

function traerUsuarioPorEmail(userEmail) {
	let todosLosUsuarios = traerTodosLosUsuarios();
	let elUsuario = todosLosUsuarios.find(unUsuario => unUsuario.email == userEmail);
	return elUsuario;
}

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
		let validation = validationResult(req);
		let errors = validation.errors
		if (errors != '') {
			console.log(errors) 
			res.render('users/register',{errors, branches}) 
		}else{
			let newDataBase = [...users, newUser]
			fs.writeFileSync(rutaUsersJSON, JSON.stringify(newDataBase,null, ' ') );
			res.redirect('/users/login')
		}
	},
		
	// Login - Este metodo es de autentificación del usuario
	auth: (req,res) => {
		// let usuarioBuscado = users.find(usuario => req.body.email == usuario.email)//req.body.password == usuarioEncontrado.passsword pero hay un problema que se soluciona en el siguiente punto
		// let autorizado = bcrypt.compareSync(req.body.password, usuarioBuscado.password) // El primer parametro es el string que quiero comparar y el segundo parametro es el hash contra el que lo quiero comparar
		// if(autorizado){
		// res.redirect('/')// En realidad res.redirect('/users/profile') pero es para testear que logea bien con el compare de bcrypt
		// }else{
		// 	res.render('users/login', {branches})
		// }
// -----------------------------------------------------------------------------------------//
		let validation = validationResult(req);
		let errors = validation.errors
		if (errors != '') {
			console.log(errors) 
			res.render('users/login',{errors, branches}) 
		}
		// Guardamos en una variable al usuario que se quiere logear
		let usuarioLogeado = traerUsuarioPorEmail(req.body.email); 
		console.log(usuarioLogeado); 

		// Si encuentra al usuario ...
		if(usuarioLogeandose != undefined){
			// Verifica la contraseña y lo envia al profile
			let autorizado = bcrypt.compareSync(req.body.password, usuarioLogedo.password)
			if(autorizado){
				// Esta autorizado si las contraseñas coinciden
				// Una vez verificado que es el usuario, tenemos que ponerlo en session --> idDelUsuario es lo que guardo del usuario en este caso el id
				req.session.idDelUsuario = usuarioLogeado.id

				// En caso de que tilde recordame ...

				res.redirect('/profile' + usuarioLogeado.id);
			}
		}else{
			// Si no encontro al usuario ...
			res.send('No existe este usuario')
		}
	},

	profile: (req,res) => {
		let user = users.find(user => req.params.id == user.id)
		res.render('users/userProfile', {user, branches})
	},
	

	// Update - Form to edit
	edit: (req, res) => {
		let user = users.find(user => req.params.id == user.id)
		res.render('users/userProfileForm', {user, branches})
		
	},
	// Update - Method to update
	update: (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log(errors) 
			res.render('users/edit/'+ req.params.id,{errors, branches})
			//   return res.status(422).json({ errors: errors.array() });
		}else{
			let userToModify = users.find(user => req.params.id == user.id)
			userToModify = {
				first_name: req.body.first_name,
				last_name: req.body.last_name,
				avatar : req.files[0].filename,
				email: req.body.email,
				gender: req.body.gender,
				birth_day: req.body.birth_day,
				mobile_number: req.body.mobile_number,
			}
			let filteredDataBase = users.filter(user => req.params.id == user.id)
			let newDataBase = [...filteredDataBase, userToModify]
			fs.writeFileSync(rutaUsersJSON, JSON.stringify(newDataBase,null, ' ') );
			res.redirect('/users/'+ req.params.id)
		}
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