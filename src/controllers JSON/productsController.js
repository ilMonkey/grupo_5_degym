const fs = require('fs');
const path = require('path');
// Parse de Product
const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

// Parse de Branches
const branchesFilePath = path.join(__dirname, '../data/branches.json');
var branches = JSON.parse(fs.readFileSync(branchesFilePath, 'utf-8'));
branches = branches.filter(branch => branch.id < 7 );


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {

	// All - Metodo que muestra todas las clases disponibles
	all: (req, res) => {
		let products_view = products.filter(product => product.id <= 6 );
		res.render('products/products',{products: products_view, branches})
	},

	// Detail - Metodo que detalla la clase seleccionada
	detail: (req, res) => {
		let idDelProducto= req.params.id;
		let product = products.find(product => product.id == idDelProducto)
		let finalPrice = product.price
		res.render('products/productDetail', {product, finalPrice, branches,toThousand})
	},

	// Create - Este metodo viaja por GET cuando tocamos Crear Nuevo Producto
	create: (req, res) => {
		res.render('products/productAdd')
	},
	
	// Create -  Metodo que viaja por POST para crear un producto
	store: (req, res) => {
		let nuevoProducto= {
			id: products.length + 1,
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
			category: req.body.category,
			description: req.body.description,
			image: "imagen_de_prueba.jpg",
		}
		let nuevaBaseDD = [...products, nuevoProducto];
		let nuevaBaseDDJSON = JSON.stringify(nuevaBaseDD);
		fs.writeFileSync(productsFilePath, nuevaBaseDDJSON);
		res.redirect('/products')
	},

	// Update - Metodo que viaja por GET para editar un producto
	edit: (req, res) => {
		let id= req.params.id; 
		let product = products.find(product => product.id == req.params.id)
		res.render('products/productEdit', {product, branches}) 
	},
	
	// Update - metodo que viaja por PUT cuando ya realizamos todos las ediciones necesarias
	update: (req, res, next) => {
		let editId = req.params.id;
        products.forEach(product => {
			if (product.id == editId) {
				product.name = req.body.name
				product.description = req.body.description
				product.category = req.body.category  
				product.price = req.body.price
				product.instructor = req.body.instructor
				product.max_quotes = req.body.max_quotes
				product.schedule = req.body.schedule   
				// product.image = req.file[0].filename
			}          
        });
        let productsJson = JSON.stringify(products)
		fs.writeFileSync(productsFilePath, productsJson)

		let branchId = req.params.id;
		branches.forEach(branch => {
			if (branch.id = branchId){
				branch.name = req.body.branch
			}
		});
		let branchesJson = JSON.stringify(branches)
		fs.writeFileSync(branchesFilePath, branchesJson)
		
        res.redirect('/products')
	},

	// Delete - Metodo que viaja por DELETE para borrar un producto
	destroy : (req, res) => {
		let idDelProductoABorrar = req.params.id;
		let nuevaBaseDeDatos = products.filter((product) => product.id != idDelProductoABorrar  ) 
		// (product) representa a cada una de las posiciones del array, va recorriendo una por una
		let nuevaBaseDeDatosJSON = JSON.stringify(nuevaBaseDeDatos);
		fs.writeFileSync(productsFilePath, nuevaBaseDeDatosJSON)
		// primer parametro el path, segundo que le meto a ese path
		res.redirect('/products')
	}
};

module.exports = controller;