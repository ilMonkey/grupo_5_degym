const DB = require ('../database/models');
const OP = DB.Sequelize.Op;


module.exports = {

	// All - Metodo que muestra todas las clases disponibles
	all: async (req, res) => {
		try {
            const lessons = await DB.Lesson.findAll()
            res.send(lessons)
        } catch (error) {
            res.send(error)
        }
	}
};
