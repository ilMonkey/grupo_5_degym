const DB = require ('../database/models');
const OP = DB.Sequelize.Op;

const mainController = {
	root: async (req, res) => {
		try {	
			let usuario = req.session;
			let products = await DB.Lesson.findAll()
			let activities = await DB.Activity.findAll()
			let branches = await DB.Branch.findAll()
		res.render('index', {products, activities, branches, usuario})
		} catch (error) {
			res.send(error)
			}
		}

	};

module.exports = mainController;
