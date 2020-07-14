const bcrypt = require('bcryptjs');
const {validationResult} = require ('express-validator');
const DB = require ('../database/models');
const OP = DB.Sequelize.Op;

const usersController = { 
	// Login - Este metodo te lleva a la vista de Login
	login: (req,res) =>res.render('users/login'),

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

			let iguales = bcrypt.compare(req.body.password, user.password)
			console.log(iguales)
			if (iguales){
				req.session.idDelUsuario = user.id;
		 		// En caso de que tilde recordame ...
				 if (req.body.recuerdame) {
				// Parametros: Como se va a llamar la cookie, que le guardamos a la cookie y opciones
					res.cookie('userCookie', user.id, {maxAge: 300000});
				   }
				   res.redirect('/users/profile/' + user.id);
			} else {
				let validation = validationResult(req);
				let errors = validation.errors
				if (errors != '') {
					console.log(errors) 
					res.render('users/login',{errors}) 
		}
			}
		} else {
			res.json({ error: 'Error de usuario y/o contraseña 2' })
			// res.render('users/login',{errors}) 
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
		res.render('users/register');
	},
	
	// Create -  Este metodo POST es para crear nuevos usuarios y que se guarden en la base de datos
	store: (req, res) => {
		let validation = validationResult(req);
		let errors = validation.errors
		if (errors != '') {
			console.log(errors) 
			res.render('users/register',{errors}) 
		}else{		
			if (!req.body.role) {
				req.body.role = 1;
			}
			req.body.avatar_url = req.files[0].filename
			req.body.password = bcrypt.hashSync(req.body.password, 10)
			let newUser = DB.User.create(req.body)
			console.log(newUser)
			res.redirect ('/')
		}
	},

	// Profile - Metodo que te lleva al profile con la info del usuario logeado
	profile: async (req,res) => {
		try {
            let user = await DB.User.findByPk(req.session.idDelUsuario)
			res.render('users/userProfile', {user})
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
			let user = await DB.User.findByPk(req.params.id)
			res.render('users/userProfileForm', {user})
		} catch (error) {
			res.send(error)
			}
	},

	// Update - Method to update
	update: (req, res) => {
		try {
			DB.User.update( 
				req.body,
				{
					where: { id: req.params.id} 
				})
			res.redirect('/profile/' + req.params.id)
		} catch (error) {
			res.send(error)
		}
	},

	// Delete - Delete one user from DB
	destroy : async (req, res) => {
		DB.User.destroy({ 
			where: { 
				id: req.params.id
			} }
			)
		res.redirect('/')
	},

	// Delete - Delete one user from DB
	forgotPass : (req, res) => {
		
	}

};

module.exports = usersController;