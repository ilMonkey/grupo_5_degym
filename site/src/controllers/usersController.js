const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

// Parse de Users
const rutaUsersJSON = path.join(__dirname, '../data/usersDataBase.json');
let DataBaseJSON = fs.readFileSync(rutaUsersJSON, 'utf-8') || '[]';
let users = JSON.parse(DataBaseJSON);

// Parse de Branches
const branchesFilePath = path.join(__dirname, '../data/branchesDataBase.json');
var branches = JSON.parse(fs.readFileSync(branchesFilePath, 'utf-8'));
branches = branches.filter(branch => branch.id < 7 );

const usersController = {
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
		let newUser = {
			id: users.length + 1,
			name: req.body.name,
			sub_name: req.body.sub_name,
            email: req.body.email,
			password: bcrypt.hashSync(req.body.password, 10),
			sub_password: req.body.sub_password
		}
		let newDataBase = [...users, newUser]
		fs.writeFileSync(rutaUsersJSON, JSON.stringify(newUser,null, ' ') );
        res.redirect('/users/profile')
	},

	profile: (req,res) => res.render('profile', {users}),

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

module.exports = usersController;