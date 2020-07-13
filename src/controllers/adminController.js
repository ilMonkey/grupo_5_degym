const DB = require ('../database/models');
const OP = DB.Sequelize.Op;

const controller = {
	// Admin Tools - Shows admin tools
	controlPanel: (req, res) => {
		res.render("adminPanel",{branches})
	},

	showBranches: async (req, res) => {
		try {
			const branches = await DB.Branch.findAll()
			res.send(branches)
		} catch (error) {
			res.send(error)
		}
	},

    storeBranch: async (req, res) => {
		try {
		    const newBranch = await DB.Branch.create(req.body)
		    res.send(newBranch)
	    } catch (error) {
		    res.send(error)
	    }
	},
	destroyBranch: async (req, res) => {
		 await DB.Branch.destroy({
				where:{
					id: req.params.id
				}
			});
			res.json({succes: 'Se elimino piola la branch'})
	},
	
	showActivities: async (req, res) => {
		try {
			const activities = await DB.Activity.findAll()
			res.send(activities)
		} catch (error) {
			res.send(error)
		}
	},

    storeActivity: async (req, res) => {
		try {
		    const newActivity = await DB.Activity.create(req.body)
		    res.send(newActivity)
	    } catch (error) {
		    res.send(error)
	    }
	},
	destroyActivity: async (req, res) => {
		 await DB.Activity.destroy({
				where:{
					id: req.params.id
				}
			});
			res.json({succes: 'Se elimino piola la activity'})
	},

}

module.exports = controller;
