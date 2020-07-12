

const DB = require ('../database/models');
const OP = DB.Sequelize.Op;

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = { 

	// All - Metodo que muestra todas las clases disponibles
	all: async (req, res) => {
		try {
            const lessons = await DB.Lesson.findAll()
            res.send(lessons)
            // res.render('/products/products', {lessons})
        } catch (error) {
            res.send(error)
        }
	},

	// Detail - Metodo que detalla la clase seleccionada
	detail: async (req, res) => {
		try {		
		const detailedLesson = await DB.Lesson.findByPk(req.params.id)
		
		res.render('products/productDetail', {detailedLesson})
		} catch (error) {
			res.send(error)
		}
	},
	
	// Create - Este metodo viaja por GET cuando tocamos Crear Nuevo Producto y muestra la vista del formulario
	createForm: async (req, res) => {
		try {		
			const activities = await DB.Activity.findAll()
			const branches = await DB.Branch.findAll()
			res.render('products/productAdd', {detailedLesson})
			} catch (error) {
				res.send(error)
			}
		},
	
	// Create -  Metodo que viaja por POST para crear un producto
	store: async (req, res) => {
		try {
		const newLesson = await DB.Lesson.create(...req.body)
				await newLesson.addLessons(req.body.days, etc)
		res.redirect('/')
	} catch (error) {
		res.send(error)
	}
},

	// Update - EDIT Metodo que viaja por GET para editar un producto
	editForm: async (req, res) => {
		try {
		const lessonToEdit = await DB.Lesson.findByPk(req.params.id, {include:{all:true}})
		const branches = await DB.Branch.findAll()
		const activities = await DB.Activity.findAll()
		res.render('products/productsEdit', {lessonToEdit, branches, activities})		 
	} catch (error) {
		res.send(error)
	}
},
	
	// Update - metodo que viaja por PUT cuando ya realizamos todos las ediciones necesarias
	update: async (req, res) => {
		try {
		const lessonToEdit = await DB.Lesson.findByPk(req.params.id, {include:{all:true}})
		lessonToEdit.setBranches(req.body.branches)
		lessonToEdit.setActivities(req.body.activities)
		
		RTCRtpSender.render('products/productsEdit)?????????
			// toEdit.id_activity = req.body.id_activity
				// toEdit.id_branch = req.body.id_branch
				// toEdit.days = req.body.days
				// toEdit.time = req.body.time
				// toEdit.max_capacity = req.body.max_capacityç
	} catch (error) {
		res.send(error)
	}
},


	// Delete - Metodo que viaja por DELETE para borrar un producto
	destroy : (req, res) => {
		
	}
};

