const DB = require ('../database/models');
const OP = DB.Sequelize.Op;


module.exports = {

	// All - Metodo que muestra todas las clases disponibles
	all: async (req, res) => {
		try {
            const lessons = await DB.Users_lesson.findAll()
            console.log('Llegue')
            res.send('llegue bien')
        } catch (error) {
            res.send(error)
        }
    },
    createForm: async (req, res) => {
		try {		
			const activities = await DB.Activity.findAll()
			const branches = await DB.Branch.findAll()
			res.render('products/productAdd', {activities, branches})
		} catch (error) {
			res.send(error)
			}
        },
        
};
