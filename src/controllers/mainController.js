const fs = require('fs');
const path = require('path');
const {validationResult} = require ('express-validator')
// DataBase Products
const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

// DataBase Branches



// const branchesFilePath = path.join(__dirname, '../data/branches.json');
// var branches = JSON.parse(fs.readFileSync(branchesFilePath, 'utf-8'));
// branches = branches.filter(branch => branch.id < 7 );


const mainController = {
	root: async (req, res) => {
		try {	
			let usuario = req.session;
			let products = await DB.Lesson.findAll()
			let activities = await DB.Activity.findAll()
			let branches = await DB.Branch.findAll()
		res.render('index', {products, avtivities, branches, usuario})
		} catch (error) {
			res.send(error)
			}
		}
	};

module.exports = mainController;
