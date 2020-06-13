const fs = require('fs');
const path = require('path');

// Parse de Product
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

// Parse de Branches
const branchesFilePath = path.join(__dirname, '../data/branchesDataBase.json');
var branches = JSON.parse(fs.readFileSync(branchesFilePath, 'utf-8'));
branches = branches.filter(branch => branch.id < 5 );


const controller = {
	// Root - Show all users
	root: (req, res) => {
		res.render('login',{branches});
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('register',{branches});
	},
	
	// Create -  Method to store
	store: (req, res) => {
		
	},

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
	},

	// Delete - Delete one user from DB
	destroy : (req, res) => {
		// Do the magic
	},

	// Delete - Delete one user from DB
	forgotPass : (req, res) => {
		res.render('resetPassword',{branches});
	}

};

module.exports = controller;