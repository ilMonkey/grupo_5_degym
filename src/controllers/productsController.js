const DB = require ('../database/models');
const OP = DB.Sequelize.Op;


module.exports = {
	//LESSONS = PRODUCTS
	// All - Metodo que muestra todas las clases disponibles (los "products")
	all: async (req, res) => {
		try {
			let usuario = req.session;
			let products = await DB.Lesson.findAll()
			let activities = await DB.Activity.findAll()
            res.render('products/products',{products, usuario, activities})
        } catch (error) {
            res.send(error)
        }
	},
	// Detail - Metodo que trae la vista del producto detallada
	detail: async (req, res) => {
		try {
			let usuario = req.session;			
			let product = await DB.Lesson.findByPk(req.params.id)
			res.render('products/productDetail', {product, usuario})
        } catch (error) {
            res.send(error)
        } 
	},

	// GET - Metodo que muestra el formulario de creacion de producto (lesson)
    create: async (req, res) => {
		try {	
			let usuario = req.session;				
			let activities = await DB.Activity.findAll()
			let branches = await DB.Branch.findAll()
			let products = await DB.Lesson.findAll()
			res.render('products/productCreate', {activities, branches, products, usuario})
		} catch (error) {
			res.send(error)
			}
		},
	
	// POST - Metodo que envia el formulario de creacion de producto  (lesson)
	
	store: async (req, res) => {
		try {
			const newProduct = await DB.Lesson.create(req.body)
			// await newProduct.addBranches(req.body.id_branch)
			// await newProduct.addActivities(req.body.id_activity)
			// res.send('Se creo la clase')
			res.redirect('/admin')
		} catch (error) {  
			res.send(error)
		}
	},

	// GET - Metodo que muestra el formulario de EDICION de producto (lesson)
	edit: async (req, res) => {
		try {
			let usuario = req.session;		
			let product = await DB.Lesson.findByPk(req.params.id)
			let activities = await DB.Activity.findAll()
			let branches = await DB.Branch.findAll()
			res.render('products/productEdit', {product, activities, branches, usuario})
		} catch (error) {
			res.send(error)
			}
		},
	
	// PUT - Metodo que actualiza en la DB las clases editadas
	update: async (req, res) => {
		try {
			DB.Lesson.update( 
				req.body,
				{ where: { id: req.params.id} }
			  )
			res.redirect('/')
		} catch (error) {
			res.send(error)
		}
	},
	
	// DELETE - Metodo que elimina el registro de un product (lesson)
	destroy: async (req, res) => {
		try {
			DB.Lesson.destroy({ 
				where: { 
					id: req.params.id
				} }
			  )
			res.redirect('/')
		} catch (error) {
			res.send(error)
		}
	},

};
