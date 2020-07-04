const fs = require('fs');
const path = require('path');
const {validationResult} = require ('express-validator')
// DataBase Products
const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

// DataBase Branches
const branchesFilePath = path.join(__dirname, '../data/branches.json');
var branches = JSON.parse(fs.readFileSync(branchesFilePath, 'utf-8'));
branches = branches.filter(branch => branch.id < 7 );


const mainController = {
	root: (req, res) => {
		let usuario = req.session;
		res.render('index', {products, branches,usuario})
	},
	search: (req, res) => {
		
	}
};

module.exports = mainController;
