const bcrypt = require('bcryptjs');
const {validationResult} = require ('express-validator');
const DB = require ('../database/models');
const OP = DB.Sequelize.Op;

// Funciones customisadas
function traerUsuarioPorEmail(userEmail) {
const user = await User.findOne({
	where: {
	 email: req.body.email 
	}
	})
	if (user) {
		const iguales = bcrypt.compareSync(req.body.password, user.password);
		if (iguales) {
			console.log("llegue bien"
		} else {
			res.json({ error: 'Error de usuario y/o contraseña' })
		}
	} elese {
		res.json({ error: 'Error de usuario y/o contraseña' })
	}


	return elUsuario
	console.log(elUsuario)
}

const usersController = { 
	// Login - Este metodo te lleva a la vista de Login
	login: (req,res) =>res.render('users/login'),

	// Login - Este metodo es de autentificación del usuario, session y cookies EXPLICADO!!!
	auth: async (req,res) => {
		// let validation = validationResult(req);
		// let errors = validation.errors
		// if (errors != '') {
		// 	console.log(errors) 
		// 	res.render('users/login',{errors}) 
		// }
		// Guardamos en una variable al usuario que se quiere logear
		try {
			const user = await DB.User.findOne({
			where: {
				email: req.body.email
			}
		}) 
		if (user){
			const iguales = bcrypt.compareSync(req.body.password, user.password)
			if (iguales){
				req.session.idDelUsuario = user.id;
				res.redirect('/users/profile/' + user.id);
			} else {
				res.json({ error: 'Error de usuario y/o contraseña' })
//				res.render('users/login',{errors}) 
			}
		} else {
			res.json({ error: 'Error de usuario y/o contraseña' })
//			res.render('users/login',{errors}) 
		}

		} catch (error) {
			res.send('error')
		}


		// let usuarioLogeado = traerUsuarioPorEmail(req.body.email); 
		// console.log(usuarioLogeado); 
		// Si encuentra al usuario ...
		// if(usuarioLogeado != undefined){
		// 	// Verifica la contraseña y lo envia al profile
		// 	let autorizado = bcrypt.compareSync(req.body.password, usuarioLogeado.password)
		// 	if(autorizado){
		// 		// Esta autorizado si las contraseñas coinciden
		// 		// Una vez verificado que es el usuario, tenemos que ponerlo en session --> idDelUsuario es lo que guardo del usuario en este caso el id
		// 		req.session.idDelUsuario = usuarioLogeado.id
		// 		// En caso de que tilde recordame ...
		// 		if (req.body.recuerdame) {
		// 			// Parametros: Como se va a llamar la cookie, que le guardamos a la cookie y opciones
		// 			res.cookie('userCookie', usuarioLogeado.id, {maxAge: 300000});
		// 		}
		// 		res.redirect('/users/profile/' + usuarioLogeado.id);
		// 		// res.redirect('/' + usuarioLogeado.id);
		// 	}
		// }else{
		// 	// Si no encontro al usuario ...
		// 	res.redirect('/users/login');
		// }
	},

	// Logout - Metodo para deslogearse
	logout: (req, res) => {
		req.session.destroy();
	//	req.cookie('userCookie', null, {maxAge: 1});
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
			req.body.avatar = req.files[0].filename,
			req.body.password = bcrypt.hashSync(req.body.password, 10)
			let newUser = DB.User.create(req.body)
			console.log(newUser)
			res.send('Se cargo el usuario perfectamente')
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