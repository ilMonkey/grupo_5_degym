

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
	create: (req, res) => {
		res.render('products/productAdd')
	},
	
	// Create -  Metodo que viaja por POST para crear un producto
	store: async (req, res) => {
		try {
		const newLesson = await DB.Lesson.create(req.body)
				await newLesson.addLessons(req.body.lessons)
		res.redirect('/')
	} catch (error) {
		res.send(error)
	}
},
	
	// Update - Metodo que viaja por GET para editar un producto
	edit: async (req, res) => {
		try {
		const lessonToEdit = await DB.Lesson.findByPk(req.params.id);
		res.render('products/productsEdit', {lessonToEdit})		 
	} catch (error) {
		res.send(error)
	}
},
	
	// Update - metodo que viaja por PUT cuando ya realizamos todos las ediciones necesarias
	update: async (req, res) => {
		try {
		const toEdit = await DB.Lesson.findByPk(req.params.id)
				toEdit.id_activity = req.body.id_activity
				toEdit.id_branch = req.body.id_branch
				toEdit.days = req.body.days
				toEdit.time = req.body.time
				toEdit.max_capacity = req.body.max_capacityç


	} catch (error) {
		res.send(error)
	}
},


	// Delete - Metodo que viaja por DELETE para borrar un producto
	destroy : (req, res) => {
		
	}
};

