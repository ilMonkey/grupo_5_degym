const DB = require ('../database/models');
const OP = DB.Sequelize.Op;

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
	detail: (req, res) => {
		
	},

	// Create - Este metodo viaja por GET cuando tocamos Crear Nuevo Producto
	create: (req, res) => {
		res.render('products/productAdd')
	},
	
	// Create -  Metodo que viaja por POST para crear un producto
	store: (req, res) => {
		
	},

	// Update - Metodo que viaja por GET para editar un producto
	edit: (req, res) => {
		 
	},
	
	// Update - metodo que viaja por PUT cuando ya realizamos todos las ediciones necesarias
	update: (req, res, next) => {
		
	},

	// Delete - Metodo que viaja por DELETE para borrar un producto
	destroy : (req, res) => {
		
	}
};

