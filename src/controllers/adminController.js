const DB = require ('../database/models');
const OP = DB.Sequelize.Op;

const controller = {

	// Admin Tools - Shows admin tools
	controlPanel: (req, res) => {
		res.render("admin/adminPanel")
	},
 
	showBranches: async (req, res) => {
		try {
			const branches = await DB.Branch.findAll()
			res.send(branches)
		} catch (error) {
			res.send(error)
		}
	},

    storeBranch: async (req, res) => {
		try {
		    const newBranch = await DB.Branch.create(req.body)
		    res.send(newBranch)
	    } catch (error) {
		    res.send(error)
	    }
	},
	destroyBranch: async (req, res) => {
		 await DB.Branch.destroy({
				where:{
					id: req.params.id
				}
			});
			res.json({succes: 'Se elimino piola la branch'})
	},


	// Metodos de Admin controller para administrar las actividades.

	showActivities: async (req, res) => {
		try {
			const activities = await DB.Activity.findAll()
			// res.send('Llegue')
			res.render('activities', {activities})
		} catch (error) {
			res.send(error)
		}
	},

    storeActivity: async (req, res) => {
		try {
			req.body.img = req.files[0].filename
			const newActivity = await DB.Activity.create(req.body)
			console.log(newActivity)
			res.send('llegue')
		    // res.redirect('/admin/activities')
	    } catch (error) {
		    res.send(error)
	    }
	},
	destroyActivity: async (req, res) => {
		 await DB.Activity.destroy({
				where:{
					id: req.params.id
				}
			});
			res.json({succes: 'Se elimino piola la activity'})
	},

	// Metodos de Admin controller para administrar las clases.

	// showLessons: async (req, res) => {
	// 	try {
	// 		let lessons = await DB.Lesson.findAll()
	// 		res.send(lessons)
	// 	} catch (error) {
	// 		res.send(error)
	// 	}
	// },

    // storeLesson: async (req, res) => {
	// 	try {
	// 		req.body.img = req.files[0].filename
	// 	    const newLesson = await DB.Lesson.create(req.body)
	// 	    res.redirect('/admin/activities')
	//     } catch (error) {
	// 	    res.send(error)
	//     }
	// },
	// destroyLesson: async (req, res) => {
	// 	 await DB.Activity.destroy({
	// 			where:{
	// 				id: req.params.id
	// 			}
	// 		});
	// 		res.json({succes: 'Se elimino piola la activity'})
	// },

	showUsers: async (req, res) => {
		// muestra listado de usuarios de la base de datos
		try {
			let users = await DB.User.findAll()
			res.send(users)
		} catch (error) {
			res.send(error)
		}
	},	

	editUser: (req, res) => {
		//muestra formulario de edición de un usuario

	},

	storeUser: (req, res) => {
		//Guarda modificaciones de un usuario

	},

	destroyUser: (req, res) => {
		//Borra un usuario
	}
}

module.exports = controller;
