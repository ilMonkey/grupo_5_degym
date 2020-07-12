const DB = require ('../database/models');
const OP = DB.Sequelize.Op;


module.exports = {

	// All - Metodo que muestra todas las clases disponibles
	all: async (req, res) => {
		try {
            const lessons = await DB.User_lesson.findAll()
            console.log('Llegue')
            res.send(lessons)
        } catch (error) {
            res.send(error)
        }
    },
    store: async (req, res) => {
		try {
		    const newLesson = await DB.Lesson.create(...req.body)
            await newLesson.addBranches(req.body.branches_id)
            await newLesson.addActivities(req.body.activities_id)
		    res.redirect('/')
	    } catch (error) {
		    res.send(error)
	    }
    },
    create: async (req, res) => {
		try {		
			const activities = await DB.Activity.findAll()
			const branches = await DB.Branch.findAll()
			res.render('products/productAdd', {activities, branches})
		} catch (error) {
			res.send(error)
			}
        },
};
