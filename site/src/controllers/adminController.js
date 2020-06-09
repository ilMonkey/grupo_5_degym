const fs = require('fs');
const path = require('path');

const branchesFilePath = path.join(__dirname, '../data/branchesDataBase.json');
const branches = JSON.parse(fs.readFileSync(branchesFilePath, 'utf-8'));

const controller = {
	// Admin Tools - Shows admin tools
	controlPanel: (req, res) => {
		res.render("adminPanel")
	},

	showBranches: (req, res) => {
		res.render('branches',{branches: branches})
    },

    storeBranch: (req, res) => {
		let nuevaSede= {
			id: branches.length + 1,
			name: req.body.name,
			address: req.body.address
		}
		let nuevaBaseDD = [...branches, nnuevaSede];
		let nuevaBaseDDJSON = JSON.stringify(nuevaBaseDD);
		fs.writeFileSync(productsFilePath, nuevaBaseDDJSON);
		res.redirect('/admin/branches')
    },
    
    destroyBranch : (req, res) => {
		let idDeSedeABorrar = req.params.id;
		let nuevaBaseDeDatos = products.filter((product) => product.id != idDeSedeABorrar  ) 
		// (product) representa a cada una de las posiciones del array, va recorriendo una por una
		let nuevaBaseDeDatosJSON = JSON.stringify(nuevaBaseDeDatos);
		fs.writeFileSync(branchesFilePath, nuevaBaseDeDatosJSON)
		// primer parametro el path, segundo que le meto a ese path
		res.redirect('/admin/branches')
	}
}

module.exports = controller;
