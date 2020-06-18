const fs = require('fs');
const path = require('path');
const {validationResult} = require ('express-validator')
// DataBase Products
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

// DataBase Branches
const branchesFilePath = path.join(__dirname, '../data/branchesDataBase.json');
var branches = JSON.parse(fs.readFileSync(branchesFilePath, 'utf-8'));
branches = branches.filter(branch => branch.id < 7 );


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const mainController = {
	root: (req, res) => {
		res.render('index', {products, branches})
	},
	search: (req, res) => {
		// Do the magic
	},
	processLogin: (req,res) =>{
		let validation = validationResult(req)
		let errors = validation.errors
		if(errors != ''){
		res.render('login', {errors})
	}
	}
};

module.exports = mainController;
