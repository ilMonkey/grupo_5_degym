const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const controller = {
	// Root - Show all users
	root: (req, res) => {
		
	},

	// Create - Form to create
	create: (req, res) => {
		
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
	}
};

module.exports = controller;