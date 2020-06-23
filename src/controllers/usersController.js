const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const {validationResult} = require ('express-validator')
const {check} = require ('express-validator')
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
		
	// Login - Este metodo es de autentificación del usuario, session y cookies EXPLICADO!!!
	auth: (req,res) => {
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
		if(usuarioLogeado != undefined){
			// Verifica la contraseña y lo envia al profile
			let autorizado = bcrypt.compareSync(req.body.password, usuarioLogeado.password)
			if(autorizado){
				// Esta autorizado si las contraseñas coinciden
				// Una vez verificado que es el usuario, tenemos que ponerlo en session --> idDelUsuario es lo que guardo del usuario en este caso el id
				req.session.idDelUsuario = usuarioLogeado.id
 
				// En caso de que tilde recordame ...
				if (req.body.recuerdame) {
					// Parametros: Como se va a llamar la cookie, que le guardamos a la cookie y opciones
					res.cookie('userCookie', usuarioLogeado.id, {maxAge: 30000});
				}
				res.redirect('/');
				// res.redirect('/' + usuarioLogeado.id);
			}
		}else{
			// Si no encontro al usuario ...
			res.redirect('/users/login');
		}
	},

	// Profile - Metodo que te lleva al profile con la info del usuario logeado
	profile: (req,res) => {
		// Buscamos al usuario por su id... Esta ruta va a estar protegida solo para el usuario que esta logeado
		let user = traerTodosLosUsuarios().find(usuario => usuario.id == req.session.idDelUsuario);
		res.render('users/userProfile', {user, branches})
	},

	// Logout - Metodo para deslogearse
	logout: (req, res) => {
		req.session.destroy();
		req.cookie('userCookie', null, {maxAge: 1});
		res.redirect('/');
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
		}else{
			let userToModify = users.find(user => req.params.id == user.id)
			userToModify = {
				id: req.params.id,
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