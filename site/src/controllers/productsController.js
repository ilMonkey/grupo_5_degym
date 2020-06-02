const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {

	// Detail - Metodo que detalla la clase seleccionada
	detail: (req, res) => {
		let idDelProducto= req.params.id;
		let product = products.find(product => product.id == idDelProducto)
		let finalPrice = (product.price) * (1-(product.discount/100))
		res.render('detail', {product, finalPrice, toThousand})
	},

	// Create - Este metodo viaja por GET cuando tocamos Crear Nuevo Producto
	create: (req, res) => {
		res.render('product-create-form')
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
		res.redirect('/')
	},

	// Update - Metodo que viaja por GET para editar un producto
	edit: (req, res) => {
		let id= req.params.id;
		let product = products.find(product => product.id == req.params.id)
		res.render('product-edit-form', {product})
	},
	// Update - metodo que viaja por POST cuando ya realizamos todos las ediciones necesarias
	update: (req, res) => {
		let editId = req.params.id
        products.forEach(product => {
        if (product.id == editId) {
            product.name = req.body.name
            product.description = req.body.description
            product.price = req.body.price
            product.discount = req.body.discount
            product.image = "imagen_de_prueba-jpg"
            product.category = req.body.category           
        }            
        });
        let productsJson = JSON.stringify(products)
        fs.writeFileSync(productsFilePath, productsJson)
        res.redirect('/')
	},

	// Delete - Metodo que viaja por DELETE para borrar un producto
	destroy : (req, res) => {
		let idDelProductoABorrar = req.params.id;
		let nuevaBaseDeDatos = products.filter((product) => product.id != idDelProductoABorrar  ) 
		// (product) representa a cada una de las posiciones del array, va recorriendo una por una
		let nuevaBaseDeDatosJSON = JSON.stringify(nuevaBaseDeDatos);
		fs.writeFileSync(productsFilePath, nuevaBaseDeDatosJSON)
		// primer parametro el path, segundo que le meto a ese path
		res.redirect('/')
	}
};

module.exports = controller;