const bcrypt = require('bcryptjs');
const {validationResult} = require ('express-validator');
const DB = require ('../database/models');
const OP = DB.Sequelize.Op;

const usersController = { 
	// Login - Este metodo te lleva a la vista de Login
	login: (req,res) =>{
		let usuario = req.session;
		res.render('users/login', {usuario})
	},

	// Login - Este metodo es de autentificación del usuario, session y cookies EXPLICADO!!!
	auth: async (req,res) => {
		
		// Guardamos en una variable al usuario que se quiere logear
		try {
			const user = await DB.User.findOne({
			where: {
				email: req.body.email
			}
		}) 
		if (user){
			console.log(req.body.password)
			console.log(user.password)
			let iguales = bcrypt.compare(req.body.password, user.password)
			console.log('que trae en variable iguales: ',iguales)
			if (iguales){
				req.session.idDelUsuario = user.id;
				req.session.rodeDelUsuario = user.role;
		 		// En caso de que tilde recordame ...
				 if (req.body.recuerdame) {
				// Parametros: Como se va a llamar la cookie, que le guardamos a la cookie y opciones
					res.cookie('userCookie', user.id, {maxAge: 300000000000});
				   }
				   res.redirect('/users/profile/' + user.id);
			} else {
			//	let validation = validationResult(req);
			//	let errors = validation.errors
				if (errors != '') {
					console.log(errors) 
					res.render('users/login',{errors, usuario}) 
				}
			}
		} else {
			// res.redirect({ error: 'Error de usuario y/o contraseña 2' })
			res.redirect('/users/login') 
		}

		} catch (error) {
			// Este mensaje aparece cuando no funciona la Base de datos
			res.send('error')
		}
	},

	// Logout - Metodo para deslogearse
	logout: (req, res) => {
		req.session.destroy();
		res.cookie('userCookie', null, {maxAge: 1});
		res.redirect('/');
	},

	// Create - Metodo que se usa en el GET para ir al formulario de register
	create: async (req, res) => {
		let usuario = req.session;
		res.render('users/register',{usuario});
	},
	
	// Create -  Este metodo POST es para crear nuevos usuarios y que se guarden en la base de datos
	store: async (req, res) => {
		let usuario = req.session;
		let validation = validationResult(req);
		let errors = validation.errors
		if (errors != '') {
			console.log(errors) 
			res.render('users/register',{errors, usuario}) 
		}else{
			// buscca en la base de dastos si está registrado el email
			try {
				const existeUser = await DB.User.findAll({
				where: {
					email: req.body.email
					} 
				})
				console.log(existeUser) 
				// Si ya existe el email. manda mensaje de error si no. Guarda el registro
				if  (existeUser.length>0){
					let errors = [{ 
					msg: 'El email ya está registrado',
					}]
					res.render('users/register',{errors, usuario});
				} else {	
					// Si el rol no existe le asigna valor 1
					if (!req.body.role) {
						req.body.role = 1;
					}
					req.body.avatar_url = req.files[0].filename
					req.body.password = bcrypt.hashSync(req.body.password, 10)
					let newUser = DB.User.create(req.body)
					console.log(newUser)
					res.redirect ('login')
			}

			} catch {
				// Este mensaje aparece cuando no funciona la Base de datos
				res.send('error')

			}
		}

	},

	// Profile - Metodo que te lleva al profile con la info del usuario logeado
	profile: async (req,res) => {
		try {
			let usuario = req.session;
            let user = await DB.User.findByPk(req.session.idDelUsuario)
			res.render('users/userProfile', {user, usuario})
        } catch (error) {
            res.send(error)
        }
		// Buscamos al usuario por su id... Esta ruta va a estar protegida solo para el usuario que esta logeado
		// let user = traerTodosLosUsuarios().find(usuario => usuario.id == req.session.idDelUsuario);
		// res.render('users/userProfile', {user})
	},

	// Update - Form to edit
	edit: async (req, res) => {
		try {		
			let usuario = req.session;
			let user = await DB.User.findByPk(req.params.id)
			res.render('users/userProfileForm', {user, usuario})
		} catch (error) {
			res.send(error)
			}
	},

	// Update - Method to update
	update: async (req, res) => {		
		try {
			if (req.files[0]!=undefined) {
				req.body.avatar_url = req.files[0].filename
			}	
	
			await DB.User.update( req.body,
				{
					where: { id: req.params.id} 
				})
				res.redirect('/users/profile/' + req.params.id)
		} catch (error) {
			res.send(error)
		}
	},

	// Delete - Delete one user from DB
	destroy : async (req, res) => {
		await DB.User.destroy({ 
			where: { 
				id: req.params.id
			} }
			)
		res.redirect('/')
		req.session.destroy();
	},

	// Delete - Delete one user from DB
	forgotPass : (req, res) => {
		
	}

};

module.exports = usersController;