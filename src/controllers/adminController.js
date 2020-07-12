const DB = require ('../database/models');
const OP = DB.Sequelize.Op;

const controller = {
	// Admin Tools - Shows admin tools
	// controlPanel: (req, res) => {
	// 	res.render("adminPanel",{branches})
	// },

	// showBranches: (req, res) => {
	// 	res.render('branches',{branches})
    // },

    storeBranch: async (req, res) => {
		try {
		    const newBranch = await DB.Branch.create(req.body)
		    res.send(newBranch)
	    } catch (error) {
		    res.send(error)
	    }
    },
}

module.exports = controller;
