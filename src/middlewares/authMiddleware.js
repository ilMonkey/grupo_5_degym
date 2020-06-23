// Creo una function middleware
function authMiddleware(req, res, next){

	//Preguntamos si alguien no esta en session--> si no hay nadie en session la variable va a estar indefinida. Si es undefined quiere decir que no esta logeado y lo redirigimos a login
	if(req.session.idDelUsuario == undefined){
	    return res.redirect('/users/login')
    }

	next();
}

// Lo llevamos a  nivel de rutas
module.exports = authMiddleware